from django.conf import settings
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Video



@receiver(pre_delete, sender = Video)
def clean_delete_video(sender, instance, **kwargs):
    if not settings.DEFAULT_VIDEO_THUMBNAIL == instance.video_thumbnail.name:
        instance.video_thumbnail.delete(False)
    instance.video.delete(False)