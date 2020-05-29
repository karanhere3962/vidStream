from django.apps import AppConfig


class VideosConfig(AppConfig):
    name = 'Videos'

    def ready(self):
        import Videos.signals
