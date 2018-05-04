from django.contrib import admin

from .models import Trabajadores, Obras, Dias

# Register your models here.
admin.site.register(Trabajadores)
admin.site.register(Obras)
admin.site.register(Dias)
