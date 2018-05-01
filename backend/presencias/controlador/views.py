from rest_framework import viewsets
from .models import Dias
from .serializers import DiasSerializer


class DiasViewSet(viewsets.ModelViewSet):
    queryset = Dias.objects.all()
    serializer_class = DiasSerializer

