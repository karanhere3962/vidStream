from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from knox import views as knox_views
from rest_framework import permissions

from rest_framework import viewsets
from rest_framework import status
from .models import *
from .permissions import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginView, self).post(request, format=None)
        return response


class UserViewSet(viewsets.ModelViewSet):

    queryset = UserAcc.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny(), ]
        else:
            return [IsUserOrAdmin(), ]

    @action(detail=True, methods=["post"])
    def set_password(self, request, pk=None):
        print(dir(request._request))
        print(request._request.build_absolute_uri("/api/videos/"))
        user = self.get_object()
        serializer = PasswordSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=["put"])
    def profile(self, request, pk=None):
        user = self.get_object()
        serializer = ProfileSerializer(user.userprofile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(UserSerializer(user).data)


# Create your views here.
