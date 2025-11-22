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
        
        

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_article(request):
    page = request.query_params.get('page', 1)
    page_size = 6  # Set the number of articles per page
    start = (int(page) - 1) * page_size
    end = start + page_size
    articles = Article.objects.filter(status=Article.State.APPROVED).order_by('-created_date')[start:end]
    serializer = ArticleSerializer(articles, many=True, context={'request': request})
    total_count = Article.objects.count()
    next_page = int(page) + 1 if end < total_count else None
    previous_page = int(page) - 1 if int(page) > 1 else None

    return Response({
        'count': total_count,
        'next': next_page,
        'previous': previous_page,
        'results': [
            {
                'id': article['id'],
                'title': article['title'],
                'image': article['image'],
                'created_date': article['created_date'],
                'content_preview': article['content_preview'],
                'author_name': article['author_name']
            }
            for article in serializer.data
        ]
    }, status=status.HTTP_200_OK)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def article_detail(request, id):
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article)
    return Response(serializer.data, status=status.HTTP_200_OK)



@permission_classes([AllowAny])
@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def related_articles(request):
    category_id = request.query_params.get('category', None)
    if category_id:
        related_articles = Article.objects.filter(category_id=category_id, status=Article.State.APPROVED)
        serializer = ArticleSerializer(related_articles, many=True)
        return Response(serializer.data)
    else:
        return Response([])
    


    
@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def random_articles(request):
    random_article = Article.objects.filter(status=Article.State.APPROVED).order_by('?')[:3]
    serializer = ArticleSerializer(random_article, many=True)
    return Response({
        'results': [
            {
                'id': article['id'],
                'title': article['title'],
                'image': article['image'],
                'created_date': article['created_date'],
                'content_preview': article['content_preview'],
                'author_name': article['author_name']
            }
            for article in serializer.data
        ]
    }, status=status.HTTP_200_OK)




@api_view(['GET'])
@permission_classes([IsAuthenticated])  # You can adjust permissions as needed
def list_unapproved_articles(request):
    unapproved_articles = Article.objects.filter(status=Article.State.PENDING)
    serializer = ArticleSerializer(unapproved_articles, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_article(request, id):
    article = Article.objects.filter(pk=id).first()
    if not article:
        return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get the approval status from the request data
    status_value = request.data.get("status")
    if status_value not in [Article.State.REJECTED, Article.State.APPROVED, ]:
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

    # Update the article's status
    article.status = status_value
    article.save()
    
    message = "approved" if article.status == Article.State.APPROVED else "rejected"
    return Response({"message": f"Article {message} successfully!"}, status=status.HTTP_200_OK)
