from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self , email, password, **extra_fields):
        if not email:
            raise ValueError("User must have a email")


        employee = self.model(
            email = self.normalize_email(email),
            password = password,
            **extra_fields
        )

        employee.set_password(password)
        employee.save(using=self._db)
        return employee
    
    def create_superuser(self ,email, password, **extra_fields):
        employee = self.create_user(
            email = self.normalize_email(email),
            password = password,
            **extra_fields
        )

        employee.is_admin = True
        employee.is_staff = True
        employee.is_superuser = True
        employee.save(using=self._db)
        return employee

class User(AbstractBaseUser):
    email  = models.EmailField(max_length = 100, unique = True)

    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return self.is_admin
