from django.db import models
from django.conf import settings
from VideoStreaming.helper_functions import random_string_generator
from Channels.models import Channel
from django.core.exceptions import ValidationError


class VideoManager(models.Manager):

    def create_video(self, channel=None, video_title=None, video_desc=None, **kwargs):
        video_id = kwargs.get("video_id")
        if video_id:
            del(kwargs["video_id"])
            if self.filter(video_id=video_id).exists():
                raise ValidationError("video_id already in use.")
        else:
            video_id = random_string_generator(ssize=10, usePunctuation=False)
            if self.filter(video_id=video_id).exists():
                video_id = random_string_generator(
                    ssize=15, usePunctuation=False)
        video = self.create(
            channel=channel, video_title=video_title, video_desc=video_desc, video_id=video_id, **kwargs)
        return video


class Video(models.Model):
    slno = models.AutoField(primary_key=True)
    channel = models.ForeignKey(Channel,
                                name="channel", on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, name="likes", blank=True, related_name="liked")
    dislikes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, name="dislikes", blank=True, related_name="disliked")
    video_title = models.CharField(max_length=50, name="video_title")
    video_desc = models.TextField(name="video_desc")
    video_id = models.CharField(
        max_length=50, unique=True)
    video_thumbnail = models.ImageField(
        default=settings.DEFAULT_VIDEO_THUMBNAIL, upload_to='video_thumbnail')
    video = models.FileField(upload_to="videos")

    objects = VideoManager()

    class Meta:
        db_table = "Video"

    def __str__(self):
        return self.video_title + ", " + self.video_id

    def add_like(self, user):
        if self.dislikes.filter(pk=user.pk).exists():
            self.dislikes.remove(user)
        self.likes.add(user)
        return True

    def add_dislike(self, user):
        if self.likes.filter(pk=user.pk).exists():
            self.likes.remove(user)
        self.dislikes.add(user)
        return True

    @property
    def likes_count(self):
        return self.likes.count

    @property
    def dislikes_count(self):
        return self.dislikes.count

    def likeDislikeStatus(self, user):
        if self.dislikes.filter(pk=user.pk).exists():
            return "disliked"
        elif self.likes.filter(pk=user.pk).exists():
            return "liked"
        return "no_response"
