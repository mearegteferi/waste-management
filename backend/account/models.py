from django.contrib.auth.models import AbstractUser
from django.db import models


class DistrictType(models.TextChoices):
    CITY = 'city', 'City'
    SUBCITY = 'subcity', 'Subcity'
    KEBELE = 'kebele', 'Kebele'



class User(AbstractUser):

    email = models.EmailField()
    user_name = models.CharField(max_length=50)
    full_name = models.CharField(max_length=20)
    phone = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(blank=True, null=bool)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
      return f"{self.username} ({self.role})"