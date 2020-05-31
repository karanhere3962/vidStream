from rest_framework import serializers
from .models import *
from django.conf import settings


user_serializer_common_fields = (
    'username', 'email', 'date_joined', 'last_login', 'userprofile', 'id',)
user_read_only_fields = ('date_joined', 'id', 'last_login')


class ProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True, many = False)

    class Meta:
        model = UserProfile
        exclude = ('user', "id",)


class UserSerializer(serializers.ModelSerializer):

    userprofile = ProfileSerializer(read_only=True)
    password = serializers.CharField(
        write_only=True, min_length=settings.MIN_PASSWORD_LENGTH)

    class Meta:
        model = UserAcc
        fields = user_serializer_common_fields + ('password',)
        read_only_fields = user_read_only_fields

    def create(self, validated_data):

        return UserAcc.objects.create_user(**validated_data)

    def update(self, instance, validated_data):

        if "password" in validated_data:
            raise serializers.ValidationError(
                "Cannot reset password at this api endpoint.")
        return super().update(instance, validated_data)


class PasswordSerializer(serializers.ModelSerializer):

    userprofile = ProfileSerializer(read_only=True)
    response = serializers.CharField(default="Password was set successfully.")
    current_password = serializers.CharField(
        write_only=True, min_length=settings.MIN_PASSWORD_LENGTH, required=True)
    new_password = serializers.CharField(
        write_only=True, min_length=settings.MIN_PASSWORD_LENGTH, required=True)

    class Meta:
        model = UserAcc
        fields = user_serializer_common_fields + \
            ('current_password', 'new_password', 'response')
        read_only_fields = user_serializer_common_fields + ('response',)

    def validate(self, data):
        if data["current_password"] == data["new_password"]:
            raise serializers.ValidationError(
                "current_password and new_password cannot be same.")
        return data

    def update(self, instance, validated_data):
        if not instance.check_password(validated_data["current_password"]):
            raise serializers.ValidationError(
                "current_password entered is incorrect.")
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance

    # def update(self, instance, validated_data):
