# Generated by Django 2.1.7 on 2020-05-19 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Channels', '0006_auto_20200516_1510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='channel_id',
            field=models.CharField(default='Mk53mc0', max_length=25, unique=True),
        ),
    ]