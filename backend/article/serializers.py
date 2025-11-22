from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Category

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
        
    
class ArticleSerializer(serializers.ModelSerializer):  
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), default=serializers.CurrentUserDefault())
    content_preview = serializers.SerializerMethodField()
    content = serializers.CharField()
    category = CategorySerializer(read_only=True)
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author', 'created_date', 'image', 'status', 'content_preview', 'content', 'category', 'author_name']
        
    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

    def get_content_preview(self, obj):
        words = obj.content.split()
        return ' '.join(words[:20])
    
    def get_author_name(self, obj):
        return obj.author.full_name