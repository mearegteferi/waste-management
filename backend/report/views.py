from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db.models import Sum
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied, NotFound
from account.models import UnionProfile, UserAccount, TabyaProfile, SubCityProfile
from .models import ResidentWasteReport
from .serializers import ResidentWasteReportSerializer
from schedule.models import Subcity, Tabya
import logging


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def write_report(request):
    # Check if the logged-in user has the DATA_ENCODER role
    if request.user.role != 'DATA_ENCODER':
        raise PermissionDenied("You do not have permission to write a report.")

    # Get the union name, subcity name, and tabya name from the request data
    union_id = request.data.get('delivering_union')
    sub_city_name = request.data.get('sub_city')
    tabya_name = request.data.get('tabya')

    # Look up the UserAccount by id
    try:
        delivering_union = UserAccount.objects.get(id=union_id)
    except UserAccount.DoesNotExist:
        return Response({"delivering_union": "Union not found."}, status=status.HTTP_404_NOT_FOUND)

    # Look up the SubCityProfile by name
    try:
        sub_city = Subcity.objects.get(name=sub_city_name)
    except Subcity.DoesNotExist:
        return Response({"sub_city": "Sub-city not found."}, status=status.HTTP_404_NOT_FOUND)

    # Look up the TabyaProfile by name
    try:
        tabya = Tabya.objects.get(name=tabya_name, subcity=sub_city)
    except Tabya.DoesNotExist:
        return Response({"tabya": "Tabya not found."}, status=status.HTTP_404_NOT_FOUND)


    data = request.data.copy()
    data['sub_city'] = sub_city.id
    data['tabya'] = tabya.id
    
    serializer = ResidentWasteReportSerializer(data=data)

    # Validate the data
    if serializer.is_valid():
        # Save the report and set the receiver_data_encoder, delivering_union, sub_city, and tabya
        serializer.save(
            receiver_data_encoder=request.user,
            delivering_union=delivering_union,
            sub_city=sub_city,
            tabya=tabya
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # If data is invalid, return a 400 Bad Request response with errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_report(request, report_id):
    user = request.user

    # Get the report
    try:
        report = ResidentWasteReport.objects.get(id=report_id)
    except ResidentWasteReport.DoesNotExist:
        raise NotFound("Report not found.")

    # Get approval status from request data
    approval_status = request.data.get('approval_status')
    rejection_reason = request.data.get('rejection_reason')

    if approval_status not in ['approved', 'rejected']:
        return Response({"error": "Invalid approval status."}, status=status.HTTP_400_BAD_REQUEST)

    # Approval logic based on the user role
    if user.role == UserAccount.Role.TABYA:
        if report.tabya_approval_status in ["approved", "rejected"]:
            return Response({'error': 'report approved already'})
        # Tabya approval
        try:
            user_profile = TabyaProfile.objects.get(user=user)
        except TabyaProfile.DoesNotExist:
            return Response({'error': 'Tabya profile not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user's tabya matches the report's tabya
        if user_profile.tabya != report.tabya:
            return Response({'error': 'You can only approve reports from your tabya'}, status=status.HTTP_403_FORBIDDEN)

        report.tabya_approval_status = approval_status
        report.tabya_approved_by = user
        report.tabya_approval_date = timezone.now()
        if approval_status == 'rejected':
            report.rejection_reason = rejection_reason
            report.report_status = approval_status

    elif user.role == UserAccount.Role.UNION:
        if report.tabya_approval_status in ["pending", "rejected"]:
            return Response({'error': 'report should be approved by tabya first'})
        # Union approval
        if report.delivering_union != user:
            raise PermissionDenied("You can only approve reports delivered by your union.")

        report.union_approval_status = approval_status
        report.union_approval_date = timezone.now()
        if approval_status == 'rejected':
            report.union_rejection_reason = rejection_reason
            report.report_status = approval_status

    elif user.role == UserAccount.Role.CITY:
        if report.union_approval_status in ["pending", "rejected"]:
            return Response({'error': 'report should be approved by union first'})
        # City approval
        report.city_approval_status = approval_status
        report.city_approval_date = timezone.now()
        report.report_status = "approved"
        if approval_status == 'rejected':
            report.city_rejection_reason = rejection_reason
            report.report_status = approval_status

    else:
        return Response({'error': 'You do not have permission to approve this report'}, status=status.HTTP_403_FORBIDDEN)

    # Save the report after updating
    report.save()

    return Response({"message": f"Report {approval_status} by {user.role.capitalize()}"}, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_reports(request):
    user = request.user
    role = user.role
    reports = ResidentWasteReport.objects.all()
    report_status = request.query_params.get('status')

    if role == UserAccount.Role.DATA_ENCODER:
        # Data Encoder sees reports that are either rejected or approved (overall)

        if report_status == 'rejected':
            reports = reports.filter(report_status='rejected')

        elif report_status == 'approved':
            reports = reports.filter(report_status='approved')
        else:
            return Response({'error': 'Invalid status for data encoder'}, status=status.HTTP_400_BAD_REQUEST)

    elif role == UserAccount.Role.TABYA:
        # Tabya sees reports related to their tabya and can filter by pending or approved (by tabya)
        try:
            user_profile = TabyaProfile.objects.get(user=user)
        except TabyaProfile.DoesNotExist:
            return Response({'error': 'Tabya profile not found'}, status=status.HTTP_404_NOT_FOUND)

        tabya = user_profile.tabya
        if report_status == 'pending':
            reports = reports.filter(tabya=tabya, tabya_approval_status='pending')
        elif report_status == 'approved':
            reports = reports.filter(tabya=tabya, report_status='approved')
        else:
            return Response({'error': 'Invalid status for tabya'}, status=status.HTTP_400_BAD_REQUEST)

    elif role == UserAccount.Role.UNION:
        # Union sees reports related to their union and can filter by pending or approved (by union)
        if report_status == 'pending':
            reports = reports.filter(delivering_union=user, tabya_approval_status='approved', union_approval_status='pending')
        elif report_status == 'approved':
            reports = reports.filter(delivering_union=user, report_status='approved')
        else:
            return Response({'error': 'Invalid status for union'}, status=status.HTTP_400_BAD_REQUEST)

    elif role == UserAccount.Role.SUB_CITY:
        # Sub-city officials see only approved reports (overall) related to their sub-city
        try:
            user_profile = SubCityProfile.objects.get(user=user)
        except SubCityProfile.DoesNotExist:
            return Response({'error': 'Sub-city profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        sub_city = user_profile.sub_city
        if report_status == 'approved':
            reports = reports.filter(sub_city=sub_city, report_status='approved')
        elif report_status == 'rejected':
            reports = reports.filter(sub_city=sub_city, report_status='rejected')
        else:
            return Response({'error': 'Invalid status for sub city'}, status=status.HTTP_400_BAD_REQUEST)

    elif role == UserAccount.Role.CITY:
        # City officials see reports pending approval by union or approved (overall)
        if report_status == 'pending':
            reports = reports.filter(union_approval_status='approved', city_approval_status='pending')
        elif report_status == 'approved':
            reports = reports.filter(report_status='approved')
        elif report_status == 'rejected':
            reports = reports.filter(report_status='rejected')
        else:
            return Response({'error': 'Invalid status for city'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'error': 'Invalid role'}, status=status.HTTP_403_FORBIDDEN)

    # Serialize the filtered reports
    serializer = ResidentWasteReportSerializer(reports, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
