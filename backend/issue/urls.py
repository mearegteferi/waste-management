from django.urls import path
from . import views

urlpatterns = [
  path('add/', views.add_issue, name='add issue'),
  path('view/', views.view_issue, name='view issue'),
]