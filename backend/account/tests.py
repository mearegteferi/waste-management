# your_app/tests/test_views.py

from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from .models import UserAccount, Subcity, Tabya
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

class UserCreateViewTestCase(APITestCase):
    
    def setUp(self):
        # Create a Subcity and Tabya instance for testing profiles
        self.sub_city = Subcity.objects.create(name='semen')
        self.tabya = Tabya.objects.create(name='dedebit', subcity=self.sub_city)

        # URL for the user creation endpoint
        self.url = reverse('create_user')

        # Create a user with permission to create other users
        self.admin_user = UserAccount.objects.create_user(
            email="admin@example.com",
            role=UserAccount.Role.ADMIN,
            image=None,
            password="adminpassword"
        )
        content_type = ContentType.objects.get_for_model(UserAccount)
        permission = Permission.objects.get(codename='can_create_users', content_type=content_type)
        self.admin_user.user_permissions.add(permission)
        
        # Create a regular authenticated user without special permissions
        self.auth_user = UserAccount.objects.create_user(
            email="authuser@example.com",
            role=UserAccount.Role.DATA_ENCODER,
            image=None,
            password="authuserpassword"
        )

    def test_create_resident_user_no_auth(self):
        """Test creating a resident user without authentication"""
        data = {
            "email": "resident@example.com",
            "full_name": "Resident User",
            "role": UserAccount.Role.RESIDENT,
            "sub_city": self.sub_city.name,
            "tabya": self.tabya.name,
            "password": "residentpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserAccount.objects.get(email="resident@example.com").role, UserAccount.Role.RESIDENT)

    def test_create_admin_user_without_permission(self):
        """Test creating an admin user without permission should fail"""
        self.client.force_authenticate(user=self.auth_user)
        data = {
            "email": "unauthorized_admin@example.com",
            "full_name": "Unauthorized Admin",
            "role": UserAccount.Role.ADMIN,
            "password": "adminpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_user_invalid_data(self):
        """Test creating a user with invalid data should return validation errors"""
        data = {
            "email": "",  # Missing email
            "full_name": "Invalid User",
            "role": UserAccount.Role.RESIDENT,
            "password": "invalidpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_create_union_user_with_valid_profile_data(self):
        """Test creating a union user with valid profile data"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            "email": "unionuser@example.com",
            "full_name": "Union User",
            "role": UserAccount.Role.UNION,
            "password": "unionpassword",
            "union_name": "Union Group A",
            "bid_amount": 5000,
            "phone_number": "0123456789",
            "sub_city": self.sub_city.name,
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserAccount.objects.get(email="unionuser@example.com").role, UserAccount.Role.UNION)

    def test_create_user_with_duplicate_admin(self):
        """Test creating a duplicate admin user should fail due to validation rule"""
        self.client.force_authenticate(user=self.admin_user)
        # First admin user already exists in setUp
        data = {
            "email": "duplicateadmin@example.com",
            "full_name": "Duplicate Admin",
            "role": UserAccount.Role.ADMIN,
            "password": "duplicateadminpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", response.data)


