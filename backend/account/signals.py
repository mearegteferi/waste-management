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

    for role in role_names:
        group, created = Group.objects.get_or_create(name=role)
        if created:
            print(f'Created group: {role}')