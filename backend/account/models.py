from django.contrib.auth.models import AbstractUser
from django.db import models


class DistrictType(models.TextChoices):
    CITY = 'city', 'City'
    SUBCITY = 'subcity', 'Subcity'
    KEBELE = 'kebele', 'Kebele'


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class User(AbstractUser):

    phone = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
      return f"{self.username} ({self.role})"