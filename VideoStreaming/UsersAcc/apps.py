from django.apps import AppConfig


class UsersaccConfig(AppConfig):
    name = 'UsersAcc'

    def ready(self):
        import UsersAcc.signals
