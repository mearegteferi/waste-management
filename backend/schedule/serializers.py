from rest_framework import serializers
from .models import SubcityWasteCollectionSchedule, Tabya

class TabyaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tabya
        fields = ['id', 'name']  # Specify the fields you want to include in the response