from django.db import models


class Trabajadores(models.Model):
    nombre = models.CharField(max_length=30)
    documento_identificacion = models.CharField(max_length=20, unique=True)
    fecha_primer_contrato = models.DateField()

    def __str__(self):
        return self.nombre


class Obras(models.Model):
    codigo = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    contratista = models.CharField(max_length=20)
    fecha_contratacion = models.DateField()
    fecha_finalizacion = models.DateField()
    presupuesto = models.IntegerField()
    direccion = models.CharField(max_length=50)
    color = models.CharField(max_length=7)

    def __str__(self):
        return self.nombre


class Dias(models.Model):
    trabajador = models.ForeignKey(Trabajadores, on_delete=models.CASCADE)
    obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
    fecha = models.DateField()
    horas = models.IntegerField()

    def __str__(self):
        return "fecha: {0}".format( self.fecha)


