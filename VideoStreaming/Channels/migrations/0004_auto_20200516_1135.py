# Generated by Django 2.1.7 on 2020-05-16 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Channels', '0003_auto_20200516_1129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='channel_dp',
            field=models.ImageField(default='defaults/channel_dp.jpg', upload_to='channel_dp'),
        ),
        migrations.AlterField(
            model_name='channel',
            name='channel_id',
            field=models.CharField(default='HhEj1Tx', max_length=25, unique=True),
        ),
    ]