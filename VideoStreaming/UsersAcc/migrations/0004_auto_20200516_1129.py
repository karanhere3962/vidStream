# Generated by Django 2.1.7 on 2020-05-16 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UsersAcc', '0003_auto_20200513_1439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(default='/static//defaults/profile_pic.jpg', upload_to='profile_pics'),
        ),
    ]
