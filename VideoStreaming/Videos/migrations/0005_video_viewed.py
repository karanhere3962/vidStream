# Generated by Django 3.0.6 on 2020-05-30 14:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Videos', '0004_auto_20200527_0744'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='viewed',
            field=models.ManyToManyField(blank=True, related_name='viewed', to=settings.AUTH_USER_MODEL),
        ),
    ]
