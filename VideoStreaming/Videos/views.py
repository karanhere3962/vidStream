from rest_framework import viewsets
from rest_framework import status
from .models import *
from .serializers import *
from .permissions import *
from rest_framework.response import Response
from rest_framework.decorators import action


# Create your views here.


class VideoViewSet(viewsets.ModelViewSet):

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def create(self, request):
        request_data = request.data if not request.data else request.data.dict()
        data = {**request_data,
                "owner": request.user.pk}
        serializer = self.serializer_class(data=data, context={
            "request": request
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):

        video = self.get_object()
        video.add_like(request.user)
        video.save()
        return Response(self.serializer_class(video, context={
            'request': request
        }).data)

    @action(detail=True, methods=["post"])
    def dislike(self, request, pk=None):

        video = self.get_object()
        video.add_dislike(request.user)
        video.save()
        return Response(self.serializer_class(video, context={
            'request': request
        }).data)

    @action(detail=True, methods=["post"])
    def stream(self, request, pk=None):

        video = self.get_object()
        video.add_dislike(request.user)
        video.save()
        return Response(self.serializer_class(video, context={
            'request': request
        }).data)

