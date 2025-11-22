from django.urls import path
from .views import get_schedule, get_all_subcities

urlpatterns = [
    path('get_schedule/<int:subcity_id>/', get_schedule, name='get_schedule'),
    path('get_all_subcities/', get_all_subcities, name='get_all_subcities'),
]
