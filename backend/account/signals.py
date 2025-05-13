from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group


@receiver(post_migrate)
def create_user_roles(sender, **kwargs):
    role_names = [
        'Inspector',
        'Dispatcher',
        'Admin',
        'Supervisor',
        'Data Encoder',
        'Evaluator'
    ]