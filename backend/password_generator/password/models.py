from django.db import models
from user.models import User

# Create your models here.
class PasswordGenerator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , null=True, related_name='password_generator')
    password = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add = True)