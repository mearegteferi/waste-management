from rest_framework import serializers
from .models import ResidentWasteReport

class ResidentWasteReportSerializer(serializers.ModelSerializer):
    receiver_data_encoder_name = serializers.CharField(source='receiver_data_encoder.full_name', read_only=True)
    delivering_union_name = serializers.CharField(source='delivering_union.unionprofile.union_name', read_only=True)
    tabya_name = serializers.CharField(source='tabya.name', read_only=True)
    sub_city_name = serializers.CharField(source='sub_city.name', read_only=True)

    class Meta:
        model = ResidentWasteReport
        fields = [
            'id', 
            'truck_number', 
            'receiver_data_encoder', 
            'receiver_data_encoder_name',
            'delivering_union', 
            'delivering_union_name',
            'metric_ton', 
            'description', 
            'date', 
            'sub_city', 
            'sub_city_name',
            'tabya',
            'tabya_name',
            'tabya_approval_status',
            'tabya_approved_by',
            'tabya_approval_date',
            'union_approval_status',
            'union_approval_date',
            'rejection_reason',
            'city_approval_status',
            'city_approval_date',
            'report_status',
        ]
        read_only_fields = [
            'id',
            'receiver_data_encoder',
            'receiver_data_encoder_name',
            'delivering_union', 
            'delivering_union_name',
            'date',
            'sub_city_name',
            'tabya_name',
            'tabya_approval_date',
            'union_approval_date',
            'city_approval_date',
            'report_status'
        ]

    def validate(self, data):
        # Ensure tabya is valid based on the selected sub_city
        sub_city = data.get("sub_city")
        tabya = data.get("tabya")
        if sub_city and tabya and tabya.subcity != sub_city:
            raise serializers.ValidationError("The selected Tabya does not match the Subcity.")
        return data
