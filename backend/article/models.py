from django.db import models
from django.conf import settings
from django.utils import timezone



class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
      
    

class Article(models.Model):
    class State(models.TextChoices):
      PENDING = 'PENDING', 'pending'
      APPROVED = 'APPROVED', 'approved'
      REJECTED = 'REJECTED', 'rejected'



    title = models.CharField(max_length=250)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='article_images/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    status = models.CharField(max_length=50, choices=State.choices, default=State.PENDING)


    def __str__(self):
        return self.title
    


