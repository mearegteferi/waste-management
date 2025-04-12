# from rest_framework import serializers
# from .models import UserAccount, UnionProfile, OfficialProfile, ResidentProfile, TabyaProfile, SubCityProfile
# from schedule.models import Subcity, Tabya
# from django.contrib.auth.hashers import make_password
# from rest_framework.exceptions import ValidationError
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.contrib.auth import get_user_model
# from django.db import transaction
# import logging

# User = get_user_model()

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         # Add custom data to the response
#         data.update({
#             'status': self.user.status,
#             'role': self.user.role,
#             'email': self.user.email,
#         })
#         return data

# class UserCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'email', 'full_name', 'role', 'image', 'password')

#     def validate_password(self, value):
#         return make_password(value)

#     def validate(self, attrs):
#         role = attrs.get('role')
#         profile_data = {}

#         # Ensure only one admin exists
#         if role == UserAccount.Role.ADMIN:
#             if UserAccount.objects.filter(role=UserAccount.Role.ADMIN).exists():
#                 raise ValidationError("There is already an admin account. Only one admin is allowed.")

#         # Validate profile-specific fields based on role
#         if role == UserAccount.Role.UNION:
#             profile_data = {
#                 'union_name': self.context['request'].data.get('union_name'),
#                 'bid_amount': self.context['request'].data.get('bid_amount'),
#                 'phone_number': self.context['request'].data.get('phone_number'),
#                 'sub_city': self.context['request'].data.get('sub_city'),
#             }
#         elif role == UserAccount.Role.RESIDENT:
#             profile_data = {
#                 'sub_city': self.context['request'].data.get('sub_city'),
#                 'tabya': self.context['request'].data.get('tabya'),
#             }
        
#         elif role == UserAccount.Role.SUB_CITY:
#             profile_data = {
#                 'sub_city': self.context['request'].data.get('sub_city'),
#                 'phone_number': self.context['request'].data.get('phone_number')
#             }

#         elif role == UserAccount.Role.TABYA:
#             profile_data = {
#                 'phone_number': self.context['request'].data.get('phone_number'),
#                 'sub_city': self.context['request'].data.get('sub_city'),
#                 'tabya': self.context['request'].data.get('tabya'),
#             }

#         elif role in [UserAccount.Role.CITY, UserAccount.Role.ADMIN, UserAccount.Role.DATA_ENCODER]:
#             profile_data = {
#                 'phone_number': self.context['request'].data.get('phone_number'),
#             }

#         self.context['profile_data'] = profile_data
#         return attrs




#     @transaction.atomic
#     def create(self, validated_data):
#         profile_data = self.context['profile_data']
#         role = validated_data.get('role')

#         try:
#             # Create the user
#             user = super().create(validated_data)

#             # Create the corresponding profile based on the user's role
#             if role == UserAccount.Role.UNION:
#                 sub_city_name = self.context['request'].data.get('sub_city')
#                 sub_city_instance = Subcity.objects.get(name=sub_city_name) 
#                 profile_data['sub_city'] = sub_city_instance
                
#                 UnionProfile.objects.create(user=user, **profile_data)

#             elif role in [UserAccount.Role.CITY, UserAccount.Role.ADMIN, UserAccount.Role.DATA_ENCODER]:
#                 OfficialProfile.objects.create(user=user, **profile_data)

#             elif role == UserAccount.Role.TABYA:
#                 # Lookup the sub_city by name and tabya by name
#                 sub_city_name = self.context['request'].data.get('sub_city')
#                 tabya_name = self.context['request'].data.get('tabya')

#                 sub_city_instance = Subcity.objects.get(name=sub_city_name)  # Look up Subcity instance
#                 tabya_instance = Tabya.objects.get(name=tabya_name, subcity=sub_city_instance)  # Look up Tabya instance

#                 # Assign the instances to profile_data
#                 profile_data['sub_city'] = sub_city_instance
#                 profile_data['tabya'] = tabya_instance
                
#                 TabyaProfile.objects.create(user=user, **profile_data)

#             elif role == UserAccount.Role.SUB_CITY:
#                 sub_city_name = self.context['request'].data.get('sub_city')
#                 sub_city_instance = Subcity.objects.get(name=sub_city_name)
#                 profile_data['sub_city'] = sub_city_instance
                
#                 SubCityProfile.objects.create(user=user, **profile_data)
#             elif role == UserAccount.Role.RESIDENT:
#                 user.status = UserAccount.State.ACTIVE
#                 user.save()
#                 sub_city_name = self.context['request'].data.get('sub_city')
#                 tabya_name = self.context['request'].data.get('tabya')

#                 sub_city_instance = Subcity.objects.get(name=sub_city_name)
#                 tabya_instance = Tabya.objects.get(name=tabya_name, subcity=sub_city_instance)

#                 profile_data['sub_city'] = sub_city_instance
#                 profile_data['tabya'] = tabya_instance
                
#                 ResidentProfile.objects.create(user=user, **profile_data)

#             return user

#         except Exception as e:
#             logging.error("Error occurred during user/profile creation: ", e)
#             raise serializers.ValidationError({"detail": "Error occurred during user or profile creation."})




# class UnionProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UnionProfile
#         fields = ['id', 'user', 'union_name', 'bid_amount', 'phone_number', 'sub_city']

# class SubCityProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubCityProfile
#         fields = ['id', 'user', 'phone_number', 'sub_city']

# class TabyaProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TabyaProfile
#         fields = ['id', 'user', 'phone_number', 'sub_city', 'tabya']

# class OfficialProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OfficialProfile
#         fields = ['id', 'user', 'phone_number']

# class ResidentProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ResidentProfile
#         fields = ['id', 'user', 'sub_city', 'tabya']
