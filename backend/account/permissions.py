from rest_framework.permissions import BasePermission

class CanCreateUsersPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('account.can_create_users')
