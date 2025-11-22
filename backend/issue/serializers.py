from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Issue

User = get_user_model()

class IssueSerializer(serializers.ModelSerializer):
  resident = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
  subcity_name = serializers.CharField(source='sub_city.name', read_only=True)
  tabya_name = serializers.CharField(source='tabya.name', read_only=True)

  class Meta:
    model = Issue
    fields = ['id', 'description', 'sub_city', 'tabya', 'urgency_level', 'image', 'resident', 'reported_date', 'subcity_name', 'tabya_name']
  
  def create(self, validated_data):
    return super().create(validated_data)
    

