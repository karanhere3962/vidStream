from rest_framework import viewsets
from rest_framework import status
from .models import *
from .serializers import *
from .permissions import *
from rest_framework.response import Response

# Create your views here.


class ChannelViewSet(viewsets.ModelViewSet):

    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def create(self, request):

        data = {**request.data.dict(),
                "owner": request.user.pk}
        print(data)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
