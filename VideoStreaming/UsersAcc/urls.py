from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r"users", UserViewSet)


urlpatterns = [
    url(r'login/', LoginView.as_view(), name='knox_login'),
    url(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    url(r'logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path(r'', include(router.urls)),
]


# urlpatterns += router.urls
