# your_app/urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import user_profile, all_users_view, create_user, user_detail, get_all_unions, update_profile, activate_account

urlpatterns = [
    path('user/me/', user_profile, name='user-profile'),
    path('users/all/', all_users_view, name='all-users'),
    path('users/create/', create_user, name='create_user'),
    path('user/update/', update_profile, name='update-profile'),
    path('user/activate/', activate_account, name='activate-account'),
    path('user_detail/<int:user_id>/', user_detail, name='user-detail'),
    path('unions/', get_all_unions, name='get-all-unions'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)