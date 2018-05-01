from rest_framework import serializers
from .models import Dias


class DiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dias
        fields = ('trabajador', 'horas', 'dia', 'mes', 'obra')