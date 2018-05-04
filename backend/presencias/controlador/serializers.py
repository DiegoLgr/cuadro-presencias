from rest_framework import serializers
from .models import Trabajadores, Obras, Dias


class TrabajadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajadores
        fields = ('nombre', 'documento_identificacion', 'fecha_primer_contrato')


class ObrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obras
        fields = ('codigo', 'nombre', 'contratista', 'fecha_contratacion',
                  'fecha_finalizacion', 'presupuesto', 'direccion', 'color')


class DiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dias
        fields = ('trabajador', 'obra', 'fecha', 'horas')




# Cuadro

class ObrasACuadroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obras
        fields = ('codigo', 'color')

class TrabajadoresACuadroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajadores
        fields = ('nombre',)

class DatosCuadroSerializer(serializers.ModelSerializer):
    obra = ObrasACuadroSerializer(read_only=True)
    trabajador = TrabajadoresACuadroSerializer(read_only=True)


    class Meta:
        model = Dias
        fields = ('trabajador', 'fecha', 'horas', 'obra')

    def to_representation(self, instance):
        data = super(DatosCuadroSerializer, self).to_representation(instance)

        obra = data.pop('obra')
        for key, val in obra.items():
            data.update({key: val})

        trabajador = data.pop('trabajador')
        for key, val in trabajador.items():
            data.update({key: val})

        return data
