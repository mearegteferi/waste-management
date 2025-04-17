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

