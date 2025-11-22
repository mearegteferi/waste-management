from django.db import models
from django.conf import settings  # To use the UserAccount model for ForeignKey
from schedule.models import Subcity, Tabya
from django.utils import timezone


class ResidentWasteReport(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    truck_number = models.CharField(max_length=50)
    receiver_data_encoder = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='received_reports', 
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'DATA_ENCODER'}
    )
    delivering_union = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='delivered_reports', 
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'UNION'}
    )
    metric_ton = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=False)
    sub_city = models.ForeignKey(
        Subcity,
        related_name='waste_reports',
        on_delete=models.CASCADE
    )
    tabya = models.ForeignKey(
        Tabya,
        related_name='waste_reports',
        on_delete=models.CASCADE
    )



    # Tabya Environmentalist Approval
    tabya_approval_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    tabya_approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='tabya_approved_reports',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        limit_choices_to={'role': 'TABYA'}
    )
    tabya_approval_date = models.DateTimeField(null=True, blank=True)



    # Union Approval
    union_approval_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    union_approval_date = models.DateTimeField(null=True, blank=True)
    

    rejection_reason = models.TextField(null=True, blank=True)


    # City Official Approval
    city_approval_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    city_approval_date = models.DateTimeField(null=True, blank=True)



    # General Status after all approvals
    report_status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='pending'
    )

    def __str__(self):
        return f"Report {self.id} - Truck {self.truck_number}"
    
    def save(self, *args, **kwargs):
        if not self.date:
            self.date = timezone.now()  # Set current time if date is not provided
        super().save(*args, **kwargs)
    
