from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
      ADMIN = "admin", "Top General Admin"
      SUBCITY_ADMIN = "subcity_admin", "Subcity Admin"
      UNION = "union", "Union Representative"
      EVALUATOR = "evaluator", "Evaluator"
      DATA_ENCODER = "data_encoder", "Data Encoder"
      SUBCITY_STAFF = "subcity_staff", "Subcity Staff"
      TABYA_STAFF = "tabya_staff", "Tabya Staff"
      RESIDENT = "resident", "Resident"
      ORGANIZATION = "organization", "Organization"
      DRIVER = "driver", "Driver"
      INSPECTOR = "inspector", "Inspector"
      FINANCE = "finance", "Finance Officer"
      IT_SUPPORT = "it_support", "IT Support"
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
      return f"{self.username} ({self.role})"