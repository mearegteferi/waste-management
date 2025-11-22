from django.contrib import admin
from .models import Category, Article

class ArticleAdmin(admin.ModelAdmin):
  fields = ['title', 'content', 'author', 'category', 'status']
  list_display = ['title', 'created_date', 'status']
  ordering = ['created_date']
  list_filter = ['category', 'status']
  readonly_fields = ['title', 'author', 'category']
  view_on_site = False
  
  def has_add_permission(self, request, obj=None):
    return False
  
admin.site.disable_action('delete_selected')
admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)

