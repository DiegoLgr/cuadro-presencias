from rest_framework import viewsets
from .models import Trabajadores, Obras, Dias
from .serializers import TrabajadoresSerializer, ObrasSerializer, DiasSerializer, DatosCuadroSerializer


class TrabajadoresViewSet(viewsets.ModelViewSet):
    queryset = Trabajadores.objects.all()
    serializer_class = TrabajadoresSerializer


class ObrasViewSet(viewsets.ModelViewSet):
    queryset = Obras.objects.all()
    serializer_class = ObrasSerializer


class DiasViewSet(viewsets.ModelViewSet):
    queryset = Dias.objects.all()
    serializer_class = DiasSerializer


class DatosCuadroViewSet(viewsets.ModelViewSet):
    queryset = Dias.objects.all()
    serializer_class = DatosCuadroSerializer

