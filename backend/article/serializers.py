from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Category

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']