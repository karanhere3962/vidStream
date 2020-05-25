from rest_framework import serializers
from .models import *
from django.conf import settings
import os


class VideoSerializer(serializers.ModelSerializer):

    likeDislikeStatus = serializers.SerializerMethodField('likeDislikeField')
    likes = serializers.ReadOnlyField(source="likes_count")
    dislikes = serializers.ReadOnlyField(source="dislikes_count")
    video_id = serializers.CharField(min_length=1, required=False)

    class Meta:
        model = Video
        fields = '__all__'
        read_only_fields = ('likeDislikeStatus',)

    def validate(self, data):
        filename, file_extention = os.path.splitext(data['video'].name)
        if file_extention not in settings.SUPPORTED_VIDEO_FORMATS:
            raise serializers.ValidationError(
                f"{file_extention} is not supported. Supported file formats are {settings.SUPPORTED_VIDEO_FORMATS}")
        return data

    def create(self, validated_data):
        return Video.objects.create_video(**validated_data)

    def likeDislikeField(self, obj):
        return obj.likeDislikeStatus(self.context["request"].user)
