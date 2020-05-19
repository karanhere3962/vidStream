from django.db import models
from django.conf import settings
from VideoStreaming.helper_functions import random_string_generator
from Channels.models import Channel


class VideoManager(models.Manager):

    def create_video(self, channel=None, video_title=None, video_desc=None, **kwargs):
        video = self.create(
            channel=channel, video_title=video_title, video_desc=video_desc, **kwargs)
        return video


class Video(models.Model):
    slno = models.AutoField(primary_key=True)
    channel = models.ForeignKey(Channel,
                                name="channel", on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, name="likes", blank=True, related_name = "liked")
    dislikes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, name="dislikes", blank=True, related_name = "disliked")
    video_title = models.CharField(max_length=50, name="video_title")
    video_desc = models.TextField(name="video_desc")
    video_id = models.CharField(
        max_length=50, unique=True, default=random_string_generator(ssize=10, usePunctuation=False))
    video_thumbnail = models.ImageField(
        default=settings.STATIC_ROOT + 'defaults/video_thumbnail.png', upload_to='video_thumbnail')
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

    def add_dislikes(self, user):
        if self.likes.filter(pk=user.pk).exists():
            self.likes.remove(user)
        self.dislikes.add(user)
        return True
