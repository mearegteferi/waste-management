from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import ResidentWasteReport
from account.models import UserAccount, TabyaProfile
from schedule.models import Subcity, Tabya

User = get_user_model()

class ResidentWasteReportTests(APITestCase):

    def setUp(self):
        # Create test users
        self.data_encoder = User.objects.create_user(
            email='data_encoder@example.com',
            password='password123',
            role=UserAccount.Role.DATA_ENCODER,
            image=None
        )
        self.union_user = User.objects.create_user(
            email='union_user@example.com',
            password='password123',
            role=UserAccount.Role.UNION,
            image=None
        )
        self.tabya_user = User.objects.create_user(
            email='tabya_user@example.com',
            password='password123',
            role=UserAccount.Role.TABYA,
            image=None
        )
        self.city_user = User.objects.create_user(
            email='city_user@example.com',
            password='password123',
            role=UserAccount.Role.CITY,
            image=None
        )

        # Create a Subcity and Tabya for testing
        self.subcity = Subcity.objects.create(name='Test Subcity')
        self.tabya = Tabya.objects.create(name='Test Tabya', subcity=self.subcity)

        # Log in the data encoder
        self.client.login(email='data_encoder@example.com', password='password123')

    def test_create_report(self):
        """Test creating a waste report by an authenticated data encoder."""
        url = reverse('write_report')  # Replace with the actual name of your URL
        data = {
            'delivering_union': self.union_user.id,
            'sub_city': self.subcity.name,
            'tabya': self.tabya.name,
            'metric_ton': 10,
            'description': 'Test report',
            'truck_number': 'test_truck'
        }

        self.client.force_authenticate(user=self.data_encoder)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ResidentWasteReport.objects.count(), 1)
        self.assertEqual(ResidentWasteReport.objects.get().description, 'Test report')

        # Create sample waste reports
        self.approved_report = ResidentWasteReport.objects.create(
            delivering_union=self.union_user,
            sub_city=self.subcity,
            tabya=self.tabya,
            receiver_data_encoder=self.data_encoder,
            metric_ton=10,
            description='Approved report',
            tabya_approval_status='approved',
            union_approval_status='approved',
            report_status='approved',
            truck_number='test_truck'
        )
        
        self.rejected_report = ResidentWasteReport.objects.create(
            delivering_union=self.union_user,
            sub_city=self.subcity,
            tabya=self.tabya,
            receiver_data_encoder=self.data_encoder,
            metric_ton=5,
            description='Rejected report',
            tabya_approval_status='approved',
            union_approval_status='rejected',
            report_status='rejected',
            truck_number='test_truck'
        )
