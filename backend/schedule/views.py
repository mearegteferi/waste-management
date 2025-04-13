from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import SubcityWasteCollectionSchedule
from .serializers import SubcityWasteCollectionScheduleSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Subcity

@api_view(['GET'])
@permission_classes([AllowAny])
def get_schedule(request, subcity_id):
    # Retrieve the schedule for the given subcity
    schedule = get_object_or_404(SubcityWasteCollectionSchedule, subcity_id=subcity_id)

    # Serialize the schedule data
    serializer = SubcityWasteCollectionScheduleSerializer(schedule)

    # Return the serialized data as a JSON response
    return JsonResponse(serializer.data, safe=False)

def get_all_subcities(request):
    # Retrieve all subcities
    subcities = Subcity.objects.all()
    
    # Prepare data in list format
    data = [{"id": subcity.id, "name": subcity.name} for subcity in subcities]
    
    # Return JSON response
    return JsonResponse(data, safe=False)