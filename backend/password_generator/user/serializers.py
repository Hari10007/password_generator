from rest_framework.serializers import (ModelSerializer,CharField)
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User
from datetime import datetime, timedelta
from django.utils import timezone



class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(label='Confirm Password', write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'password2']

        extra_kwargs = {
            'password': {'write_only': True},
        }


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        confirm_password = validated_data.pop('password2', None)

        instance = self.Meta.model(**validated_data)

        if password is not None:
            if password == confirm_password:
                instance.set_password(password)
            else:
                raise serializers.ValidationError("Passwords must match")
        instance.save()
        return instance