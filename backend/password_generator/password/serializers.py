from rest_framework.serializers import (ModelSerializer,CharField)
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import PasswordGenerator
from datetime import datetime, timedelta
from django.utils import timezone



class PasswordGeneratorSerializer(ModelSerializer):

    class Meta:
        model = PasswordGenerator
        fields = '__all__'