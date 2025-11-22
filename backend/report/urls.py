from django.urls import path
from .views import write_report, retrieve_reports, approve_report, list_reports

urlpatterns = [
    path('write-report/', write_report, name='write_report'),
    path('view-report/', retrieve_reports, name='retrieve_reports'),
    path('approve-report/<int:report_id>/', approve_report, name='approve_report'),
    path('list_reports/', list_reports, name="list_reports")
]
