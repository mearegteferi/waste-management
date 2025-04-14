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
