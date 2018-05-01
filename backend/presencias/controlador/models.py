from django.db import models

class Dias(models.Model):
    trabajador = models.CharField(max_length=20)
    horas = models.IntegerField()
    dia = models.IntegerField()
    mes = models.IntegerField()
    obra = models.CharField(max_length=30)

    def __str__(self):
        return "{0}: {1}/{2}".format(self.trabajador, self.dia, self.mes)


class Obras(models.Model):
    nombre = models.CharField(max_length=30)
    codigo = models.IntegerField()
    color = models.CharField(max_length=7)

    def __str__(self):
        return self.nombre
