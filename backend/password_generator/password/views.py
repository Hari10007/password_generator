from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed, APIException
from .serializers import PasswordGeneratorSerializer
from .models import PasswordGenerator
from rest_framework import status
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
class PasswordSaveView(APIView):
    def post(self, request):
        user = request.user
        password = request.data.get('password')
        if password:
            try:
                user = PasswordGenerator.objects.create(user = user, password=password)
                return Response("Password Saved", status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Error Occured'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'No password found'}, status=status.HTTP_400_BAD_REQUEST)


class ListPasswordView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
            user = request.user
            passwords = PasswordGenerator.objects.filter(user = user).order_by('-created_at')

            serializer = PasswordGeneratorSerializer(passwords, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)