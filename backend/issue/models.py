from django.db import models
from django.conf import settings
from django.utils import timezone
from schedule.models import Subcity, Tabya

class Issue(models.Model):
  description = models.TextField()
  sub_city = models.ForeignKey(Subcity, on_delete=models.CASCADE) 
  tabya = models.ForeignKey(Tabya, on_delete=models.CASCADE) 
  urgency_level = models.IntegerField()
  image = models.ImageField(upload_to='report_image/', null=True, blank=True)
  resident = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  reported_date = models.DateTimeField(default=timezone.now)
