from django.conf import settings
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import UserProfile

@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user = instance)

@receiver(pre_delete, sender = settings.AUTH_USER_MODEL)
def delete_profile_pic(sender, instance, **kwargs):
    if not settings.DEFAULT_PROFILE_PIC == instance.userprofile.profile_pic.name:
        instance.userprofile.profile_pic.delete(False)