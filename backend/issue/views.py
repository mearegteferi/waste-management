from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import IssueSerializer
from .models import Issue
from schedule.models import Subcity, Tabya
from account.models import UserAccount

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_issue(request):
    resident = request.user
    
    # Get data from request
    image = request.FILES.get('image')
    description = request.data.get('description')
    sub_city_name = request.data.get('sub_city')
    tabya_name = request.data.get('tabya')
    urgency_level = request.data.get('urgency_level')

    try:
        sub_city_instance = Subcity.objects.get(name=sub_city_name)
        tabya_instance = Tabya.objects.get(name=tabya_name, subcity=sub_city_instance)
    except (Subcity.DoesNotExist, Tabya.DoesNotExist) as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Create Issue instance
    issue = Issue.objects.create(
        description=description,
        sub_city=sub_city_instance,
        image=image,
        tabya=tabya_instance,
        resident=resident,
        urgency_level=urgency_level
    )

    serializer = IssueSerializer(issue)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_issue(request):
    user = request.user
    issues = Issue.objects.all()

    if user.role == UserAccount.Role.SUB_CITY:
        # Filter by the user's Subcity
        if hasattr(user, 'subcityprofile'):
            issues = issues.filter(sub_city=user.subcityprofile.sub_city)

    elif user.role == UserAccount.Role.TABYA:
        # Filter by both the user's Subcity and Tabya
        if hasattr(user, 'tabyaprofile'):
            issues = issues.filter(
                sub_city=user.tabyaprofile.sub_city,
                tabya=user.tabyaprofile.tabya
            )

    elif user.role == UserAccount.Role.CITY:
        # City officials retrieve all issues; no filtering needed
        pass

    # Serialize and return the filtered issues with subcity and tabya names
    serializer = IssueSerializer(issues, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
