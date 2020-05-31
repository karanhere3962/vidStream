from rest_framework import serializers
from .models import *
from django.conf import settings
from django.contrib.auth import get_user_model


class ChannelSerializer(serializers.ModelSerializer):

    subscribers = serializers.ReadOnlyField(source="subscriber_count")
    owner = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=get_user_model().objects.all())
    channel_owner = serializers.ReadOnlyField(source="owner_email", )
    channel_id = serializers.CharField(max_length=25, required=False)
    class Meta:

        model = Channel
        fields = '__all__'

    def create(self, validated_data):

        return Channel.objects.create_channel(**validated_data)
