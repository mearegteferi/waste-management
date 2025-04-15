from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from .serializers import ArticleSerializer, CategorySerializer
from .models import Article, Category

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_article(request):
    author = request.user  # Get the authenticated user directly
    
    # Check if the request is a multipart/form-data request
    if 'multipart/form-data' in request.META.get('CONTENT_TYPE', ''):
        # Handle the file upload
        image = request.FILES.get('image')
        title = request.data.get('title')
        content = request.data.get('content')
        category_id = request.data.get('category')

        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({'error': 'Invalid category ID'}, status=status.HTTP_400_BAD_REQUEST)

        article = Article.objects.create(
            title=title,
            content=content,
            image=image,
            author=author,
            category=category
        )

        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Handle the case where the request is not a multipart/form-data request
        serializer = ArticleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
   