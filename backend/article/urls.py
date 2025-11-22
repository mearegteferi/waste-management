from django.urls import path
from . import views
urlpatterns = [
    path('create/', views.create_article, name='create_article'),
    path('list/', views.list_article, name='list_article'),
    path('article_detail/<int:id>/', views.article_detail, name='article_detail'),
    path('categories/', views.list_categories, name='list_categories'),
    path('related/', views.related_articles, name='related_articles'),
    path('random/', views.random_articles, name="random_articles"),
    path('unapproved/', views.list_unapproved_articles, name="list_unapproved_articles"),
    path('<int:id>/approve/', views.approve_article, name='approve_article'),
]