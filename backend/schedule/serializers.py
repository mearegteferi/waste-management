from rest_framework import serializers
from .models import SubcityWasteCollectionSchedule, Tabya

class TabyaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tabya
        fields = ['id', 'name']  # Specify the fields you want to include in the response


class SubcityWasteCollectionScheduleSerializer(serializers.ModelSerializer):
    monday_morning = TabyaSerializer(many=True, required=False)
    monday_afternoon = TabyaSerializer(many=True, required=False)
    tuesday_morning = TabyaSerializer(many=True, required=False)
    tuesday_afternoon = TabyaSerializer(many=True, required=False)
    wednesday_morning = TabyaSerializer(many=True, required=False)
    wednesday_afternoon = TabyaSerializer(many=True, required=False)
    thursday_morning = TabyaSerializer(many=True, required=False)
    thursday_afternoon = TabyaSerializer(many=True, required=False)
    friday_morning = TabyaSerializer(many=True, required=False)
    friday_afternoon = TabyaSerializer(many=True, required=False)
    saturday_morning = TabyaSerializer(many=True, required=False)
    saturday_afternoon = TabyaSerializer(many=True, required=False)

    class Meta:
        model = SubcityWasteCollectionSchedule
        fields = [
            'id', 
            'subcity', 
            'monday_morning', 
            'monday_afternoon',
            'tuesday_morning',
            'tuesday_afternoon',
            'wednesday_morning',
            'wednesday_afternoon',
            'thursday_morning',
            'thursday_afternoon',
            'friday_morning',
            'friday_afternoon',
            'saturday_morning',
            'saturday_afternoon'
        ]
    
    def create(self, validated_data):
        """Handle nested creation of the schedule and Tabyas."""
        monday_morning_data = validated_data.pop('monday_morning', [])
        monday_afternoon_data = validated_data.pop('monday_afternoon', [])
        tuesday_morning_data = validated_data.pop('tuesday_morning', [])
        tuesday_afternoon_data = validated_data.pop('tuesday_afternoon', [])
        wednesday_morning_data = validated_data.pop('wednesday_morning', [])
        wednesday_afternoon_data = validated_data.pop('wednesday_afternoon', [])
        thursday_morning_data = validated_data.pop('thursday_morning', [])
        thursday_afternoon_data = validated_data.pop('thursday_afternoon', [])
        friday_morning_data = validated_data.pop('friday_morning', [])
        friday_afternoon_data = validated_data.pop('friday_afternoon', [])
        saturday_morning_data = validated_data.pop('saturday_morning', [])
        saturday_afternoon_data = validated_data.pop('saturday_afternoon', [])
        
        # Create the schedule instance
        schedule = SubcityWasteCollectionSchedule.objects.create(**validated_data)

        # Add Tabyas to the corresponding collection times
        schedule.monday_morning.set([tabya['id'] for tabya in monday_morning_data])
        schedule.monday_afternoon.set([tabya['id'] for tabya in monday_afternoon_data])
        schedule.tuesday_morning.set([tabya['id'] for tabya in tuesday_morning_data])
        schedule.tuesday_afternoon.set([tabya['id'] for tabya in tuesday_afternoon_data])
        schedule.wednesday_morning.set([tabya['id'] for tabya in wednesday_morning_data])
        schedule.wednesday_afternoon.set([tabya['id'] for tabya in wednesday_afternoon_data])
        schedule.thursday_morning.set([tabya['id'] for tabya in thursday_morning_data])
        schedule.thursday_afternoon.set([tabya['id'] for tabya in thursday_afternoon_data])
        schedule.friday_morning.set([tabya['id'] for tabya in friday_morning_data])
        schedule.friday_afternoon.set([tabya['id'] for tabya in friday_afternoon_data])
        schedule.saturday_morning.set([tabya['id'] for tabya in saturday_morning_data])
        schedule.saturday_afternoon.set([tabya['id'] for tabya in saturday_afternoon_data])
        
        return schedule

    def update(self, instance, validated_data):
        """Handle nested updates of the schedule and Tabyas."""
        monday_morning_data = validated_data.pop('monday_morning', [])
        monday_afternoon_data = validated_data.pop('monday_afternoon', [])
        tuesday_morning_data = validated_data.pop('tuesday_morning', [])
        tuesday_afternoon_data = validated_data.pop('tuesday_afternoon', [])
        wednesday_morning_data = validated_data.pop('wednesday_morning', [])
        wednesday_afternoon_data = validated_data.pop('wednesday_afternoon', [])
        thursday_morning_data = validated_data.pop('thursday_morning', [])
        thursday_afternoon_data = validated_data.pop('thursday_afternoon', [])
        friday_morning_data = validated_data.pop('friday_morning', [])
        friday_afternoon_data = validated_data.pop('friday_afternoon', [])
        saturday_morning_data = validated_data.pop('saturday_morning', [])
        saturday_afternoon_data = validated_data.pop('saturday_afternoon', [])
        
        # Update the schedule instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()

        # Update Tabyas for each collection time
        instance.monday_morning.set([tabya['id'] for tabya in monday_morning_data])
        instance.monday_afternoon.set([tabya['id'] for tabya in monday_afternoon_data])
        instance.tuesday_morning.set([tabya['id'] for tabya in tuesday_morning_data])
        instance.tuesday_afternoon.set([tabya['id'] for tabya in tuesday_afternoon_data])
        instance.wednesday_morning.set([tabya['id'] for tabya in wednesday_morning_data])
        instance.wednesday_afternoon.set([tabya['id'] for tabya in wednesday_afternoon_data])
        instance.thursday_morning.set([tabya['id'] for tabya in thursday_morning_data])
        instance.thursday_afternoon.set([tabya['id'] for tabya in thursday_afternoon_data])
        instance.friday_morning.set([tabya['id'] for tabya in friday_morning_data])
        instance.friday_afternoon.set([tabya['id'] for tabya in friday_afternoon_data])
        instance.saturday_morning.set([tabya['id'] for tabya in saturday_morning_data])
        instance.saturday_afternoon.set([tabya['id'] for tabya in saturday_afternoon_data])
        
        return instance
