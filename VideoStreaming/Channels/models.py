from django.db import models
from django.conf import settings
from VideoStreaming.helper_functions import random_string_generator


class ChannelManager(models.Manager):

    def create_channel(self, owner=None, channel_name=None, **kwargs):
        channel_id = kwargs.get('channel_id')
        if channel_id:
            del(kwargs["channel_id"])
            if self.filter(channel_id=channel_id).exists():
                raise ValidationError("channel_id already in use.")
        else:
            channel_id = random_string_generator(ssize=10, usePunctuation=False)
            if self.filter(channel_id=channel_id).exists():
                channel_id = random_string_generator(
                    ssize=15, usePunctuation=False)
        channel = self.create(owner=owner, channel_name=channel_name, channel_id = channel_id, **kwargs)
        return channel


class Channel(models.Model):
    slno = models.AutoField(primary_key=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              name="owner", on_delete=models.CASCADE, related_name="channels")
    created_on = models.DateTimeField(auto_now_add=True)
    subscribers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, name="subscribers", blank=True, related_name="subscribed")
    channel_name = models.CharField(max_length=50, name="channel_name")
    channel_id = models.CharField(
        max_length=25, unique=True)
    channel_dp = models.ImageField(
        default=settings.DEFAULT_CHANNEL_DP, upload_to='channel_dp')

    objects = ChannelManager()

    class Meta:
        db_table = "Channel"

    def __str__(self):
        return self.channel_name + ", " + self.channel_id

    @property
    def subscriber_count(self):
        return self.subscribers.count

    @property
    def owner_email(self):
        return self.owner.email

# Create your models here.
