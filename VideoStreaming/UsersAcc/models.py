from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.core.exceptions import ValidationError
from rest_framework import serializers


class UserAccManager(BaseUserManager):

    def create_user(self, email=None, username=None, password=None, **kwargs):
        if not email:
            raise serializers.ValidationError("User must have an email address.")
        if not username:
            raise serializers.ValidationError("User must have a username.")
        if not password or str(password).__len__() < settings.MIN_PASSWORD_LENGTH:
            raise serializers.ValidationError(
                f"User must have a password with atleast {settings.MIN_PASSWORD_LENGTH} characters.")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):

        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user


class UserAcc(AbstractBaseUser):
    email = models.EmailField(max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = UserAccManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_Label):
        return True


class UserProfile(models.Model):
    MALE = "M"
    FEMALE = "F"
    OTHERS = "O"

    GENDERS = (
        (MALE, "MALE"),
        (FEMALE, "FEMALE"),
        (OTHERS, "OTHERS"),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, name="user")
    profile_pic = models.ImageField(
        default='/defaults/profile_pic.png', upload_to='profile_pics')
    gender = models.CharField(choices=GENDERS, max_length=5, blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'

    class Meta:
        db_table = 'UserProfile'


# Create your models here.
