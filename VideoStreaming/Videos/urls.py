from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r"videos", VideoViewSet)

urlpatterns = [path("", include(router.urls))]
