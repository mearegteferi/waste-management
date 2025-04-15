from django.db import models
from django.conf import settings
from django.utils import timezone



class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name