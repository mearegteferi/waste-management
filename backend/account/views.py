# from django.shortcuts import render

# # Create your views here.
# # your_app/views.py
# from .serializers import (
#     UserCreateSerializer,
#     UnionProfileSerializer,
#     OfficialProfileSerializer,
#     TabyaProfileSerializer,
#     SubCityProfileSerializer,
#     ResidentProfileSerializer,
# )
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from rest_framework.exceptions import PermissionDenied, NotFound
# from django.contrib.auth.hashers import make_password
# from rest_framework.response import Response
# from schedule.models import Subcity, Tabya
# from .models import UserAccount, UnionProfile, OfficialProfile, TabyaProfile, SubCityProfile, ResidentProfile

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def create_user(request):
#     role = request.data.get('role', 'RESIDENT')  # Default to 'RESIDENT' if no role is provided

#     # If the user is trying to create a role other than 'RESIDENT'
#     if role != 'RESIDENT':
#         if not request.user.is_authenticated:
#             return Response({'detail': 'Authentication required to create this user.'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         # Check if the authenticated user has the required permission
#         if not request.user.has_perm('account.can_create_users'):
#             raise PermissionDenied("You do not have permission to create this user role.")

#     # Proceed to create the user (either Resident or other roles)
#     serializer = UserCreateSerializer(data=request.data, context={'request': request})
#     if serializer.is_valid():
#         user = serializer.save()
#         return Response({
#             "id": user.id,
#             "full_name": user.full_name,
#             "email": user.email,
#             "role": user.role,
#         }, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile(request):
#     user = request.user
#     profile_data = get_profile_data(user)
#     if profile_data is None:
#         return Response({"detail": "User role not recognized."}, status=status.HTTP_404_NOT_FOUND)
    
#     # Create a response dictionary that includes user data and profile data
#     user_data = {
#         "id": user.id,
#         "email": user.email,
#         "full_name": user.full_name,
#         "image": user.image.url if user.image else None,  # Ensure to handle the image URL properly
#         "role": user.role,
#         "status": user.status,
#         "date_joined": user.date_joined,
#     }
#     response_data = {**user_data, **profile_data}

#     # Add tabya and subcity names if available
#     profile_instance = get_profile_instance(user)

#     if profile_instance:
#         if hasattr(profile_instance, 'tabya'):
#             response_data['tabya'] = profile_instance.tabya.name

#         if hasattr(profile_instance, 'sub_city'):
#             response_data['sub_city'] = profile_instance.sub_city.name

#     return Response(response_data) 


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_detail(request, user_id):
#     try:
#         user = UserAccount.objects.get(id=user_id)
#     except UserAccount.DoesNotExist:
#         raise NotFound("User not found.")

#     profile_data = get_profile_data(user)
#     if profile_data is None:
#         return Response({"detail": "User role not recognized."}, status=status.HTTP_404_NOT_FOUND)

#     response_data = {**get_user_data(user), **profile_data}
#     return Response(response_data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def all_users_view(request):
#     users = UserAccount.objects.all()
#     all_users_data = [get_user_data(user) for user in users]
    
#     return Response(all_users_data)



# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     user = request.user  # Get the currently authenticated user

#     try:
#         if 'multipart/form-data' in request.META.get('CONTENT_TYPE', ''):
#             # Handle the file upload
#             image_file = request.FILES.get('image')
#             if image_file:
#                 user.image = image_file  # Save the uploaded image to the user model

#             # Update other fields
#             user.full_name = request.data.get('full_name', user.full_name)
#             user.email = request.data.get('email', user.email)
#             user.save()

#             # Update role-specific profiles
#             if user.role == UserAccount.Role.UNION:
#                 union_profile = UnionProfile.objects.get(user=user)
#                 union_profile.union_name = request.data.get('union_name', union_profile.union_name)
#                 union_profile.bid_amount = request.data.get('bid_amount', union_profile.bid_amount)
#                 union_profile.phone_number = request.data.get('phone_number', union_profile.phone_number)
#                 union_profile.save()

#             elif user.role == UserAccount.Role.RESIDENT:
#                 resident_profile = ResidentProfile.objects.get(user=user)
#                 sub_city = request.data.get('sub_city') 
#                 sub_city_instance = Subcity.objects.get(name=sub_city) 
#                 resident_profile.sub_city = sub_city_instance
#                 tabya = request.data.get('tabya') 
#                 tabya_instance = Tabya.objects.get(name=tabya) 
#                 resident_profile.tabya = tabya_instance
#                 resident_profile.save()

#             elif user.role == UserAccount.Role.SUB_CITY:
#                 sub_city_profile = SubCityProfile.objects.get(user=user)
#                 sub_city_profile.phone_number = request.data.get('phone_number', sub_city_profile.phone_number) 
#                 sub_city_profile.save()

#             elif user.role == UserAccount.Role.TABYA:
#                 tabya_profile = TabyaProfile.objects.get(user=user)
#                 tabya_profile.phone_number = request.data.get('phone_number', tabya_profile.phone_number) 
#                 tabya_profile.save()

#             return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def activate_account(request):
#     user = request.user  # Get the currently authenticated user

#     # Check if the user's account is already active
#     if user.status == UserAccount.State.ACTIVE:
#         return Response({"detail": "Account is already active."}, status=status.HTTP_400_BAD_REQUEST)

#     # Extract new password and confirm password from the request
#     new_password = request.data.get('new_password')
#     re_new_password = request.data.get('re_new_password')

#     # Validate passwords
#     if not new_password or not re_new_password:
#         return Response({"detail": "Both password fields are required."}, status=status.HTTP_400_BAD_REQUEST)

#     if new_password != re_new_password:
#         return Response({"detail": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

#     # Update the user object
#     user.status = UserAccount.State.ACTIVE  # Set user status to ACTIVE
#     user.password = make_password(new_password)  # Hash the new password
#     user.save()  # Save the user instance

#     return Response({"detail": "Account activated successfully!"}, status=status.HTTP_200_OK)




# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_unions(request):
#     union_users = UserAccount.objects.filter(role=UserAccount.Role.UNION)
#     result = []
    
#     for user in union_users:
#         user_data = UserCreateSerializer(user).data
#         union_profile = UnionProfile.objects.get(user=user)
#         profile_data = UnionProfileSerializer(union_profile).data
#         result.append({**user_data, **profile_data})
    
#     return Response(result, status=status.HTTP_200_OK)


# def get_profile_data(user):
#     """Retrieve the profile data based on user role."""
#     profile_model_map = {
#         UserAccount.Role.UNION: UnionProfile,
#         UserAccount.Role.CITY: OfficialProfile,
#         UserAccount.Role.ADMIN: OfficialProfile,
#         UserAccount.Role.DATA_ENCODER: OfficialProfile,
#         UserAccount.Role.SUB_CITY: SubCityProfile,
#         UserAccount.Role.TABYA: TabyaProfile,
#         UserAccount.Role.RESIDENT: ResidentProfile,
#     }

#     profile_model = profile_model_map.get(user.role)
#     if profile_model:
#         profile = profile_model.objects.get(user=user)
#         serializer_class = {
#             UnionProfile: UnionProfileSerializer,
#             OfficialProfile: OfficialProfileSerializer,
#             SubCityProfile: SubCityProfileSerializer,
#             TabyaProfile: TabyaProfileSerializer,
#             ResidentProfile: ResidentProfileSerializer,
#         }[profile_model]

#         return serializer_class(profile).data

#     return None


# def get_user_data(user):
#     """Prepare basic user data for the response."""
#     return {
#         'id': user.id,
#         'full_name': user.full_name,
#         'email': user.email,
#         'role': user.role,
#         'image': user.image.url if user.image else None,
#         'status': user.status,
#         'date_joined': user.date_joined,
#     }

# def get_profile_instance(user):
#     """Retrieve the profile instance based on user role."""
#     profile_model_map = {
#         UserAccount.Role.UNION: UnionProfile,
#         UserAccount.Role.CITY: OfficialProfile,
#         UserAccount.Role.ADMIN: OfficialProfile,
#         UserAccount.Role.DATA_ENCODER: OfficialProfile,
#         UserAccount.Role.SUB_CITY: SubCityProfile,
#         UserAccount.Role.TABYA: TabyaProfile,
#         UserAccount.Role.RESIDENT: ResidentProfile,
#     }

#     profile_model = profile_model_map.get(user.role)
#     if profile_model:
#         return profile_model.objects.get(user=user)
#     return None
