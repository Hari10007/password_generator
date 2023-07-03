from django.db import models

# Create your models here.
class PasswordGenerator(models.Model):
    password = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add = True)