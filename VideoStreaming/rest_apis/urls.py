from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url, include



urlpatterns = [
    # url(r"user", UserView.as_view(), name = "user"),
    path(r"user/", include("UsersAcc.urls"))
]

urlpatterns = format_suffix_patterns(urlpatterns)
