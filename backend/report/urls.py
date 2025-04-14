from django.urls import path
from .views import write_report, retrieve_reports, approve_report, list_reports

urlpatterns = [
    path('write-report/', write_report, name='write_report'),
]