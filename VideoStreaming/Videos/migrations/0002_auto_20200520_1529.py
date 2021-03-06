# Generated by Django 2.1.7 on 2020-05-20 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Videos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='video_id',
            field=models.CharField(default='z5hITK0MPf', max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='video_thumbnail',
            field=models.ImageField(default='defaults/video_thumbnail.png', upload_to='video_thumbnail'),
        ),
    ]
