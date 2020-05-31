from rest_framework import permissions


class IsUserOrAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if request.user.is_authenticated:
            return True

        if "pk" in view.kwargs and view.kwargs["pk"]:
            return request.user.is_authenticated

        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user.pk == obj.pk or request.user.is_staff
