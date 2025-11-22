from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Article, Category
from account.models import UserAccount

User = get_user_model()

class ArticleAppTestCase(APITestCase):

    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(email="user@example.com", image=None, role=UserAccount.Role.RESIDENT, password="password123")
        self.admin_user = User.objects.create_user(email="admin@example.com", image=None, role=UserAccount.Role.ADMIN, password="adminpassword123")
        self.client.login(email="user@example.com", password="password123")
        
        # Create a category
        self.category = Category.objects.create(name="News", description="Latest news articles")

    def test_create_article(self):
        """Test creating an article by an authenticated user."""
        url = reverse('create_article')
        data = {
            'title': 'Sample Article',
            'content': 'This is a sample article content',
            'category': self.category.id,
            'image': "",
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Article.objects.get().title, 'Sample Article')

    def test_list_article(self):
        """Test listing approved articles with pagination."""
        # Create approved articles
        Article.objects.create(
            title="Approved Article 1",
            content="Content for article 1",
            author=self.user,
            category=self.category,
            status=Article.State.APPROVED
        )
        Article.objects.create(
            title="Approved Article 2",
            content="Content for article 2",
            author=self.user,
            category=self.category,
            status=Article.State.APPROVED
        )
        
        url = reverse('list_article')
        response = self.client.get(url, {'page': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)  # 2 articles on page 1
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)

    def test_article_detail(self):
        """Test retrieving a specific article's detail."""
        article = Article.objects.create(
            title="Detail Article",
            content="Content for detail article",
            author=self.user,
            category=self.category,
            status=Article.State.APPROVED
        )
        
        url = reverse('article_detail', args=[article.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], article.title)

    def test_related_articles(self):
        """Test listing articles related to a specific category."""
        Article.objects.create(
            title="Related Article",
            content="Content for related article",
            author=self.user,
            category=self.category,
            status=Article.State.APPROVED
        )
        
        url = reverse('related_articles')
        response = self.client.get(url, {'category': self.category.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_random_articles(self):
        """Test retrieving random articles."""
        Article.objects.create(
            title="Random Article",
            content="Content for random article",
            author=self.user,
            category=self.category,
            status=Article.State.APPROVED
        )
        
        url = reverse('random_articles')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_list_unapproved_articles(self):
        """Test listing unapproved articles by an authenticated admin."""
        Article.objects.create(
            title="Pending Article",
            content="Pending article content",
            author=self.user,
            category=self.category,
            status=Article.State.PENDING
        )
        
        url = reverse('list_unapproved_articles')
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_approve_article(self):
        """Test approving or rejecting an article by an authenticated admin."""
        article = Article.objects.create(
            title="Approve Article",
            content="Content for approve article",
            author=self.user,
            category=self.category,
            status=Article.State.PENDING
        )
        
        url = reverse('approve_article', args=[article.id])
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(url, {'status': Article.State.APPROVED})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        article.refresh_from_db()
        self.assertEqual(article.status, Article.State.APPROVED)

        # Test rejection
        response = self.client.post(url, {'status': Article.State.REJECTED})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        article.refresh_from_db()
        self.assertEqual(article.status, Article.State.REJECTED)
