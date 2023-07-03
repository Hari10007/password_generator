from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed, APIException
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from rest_framework import status
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                access_token = str(token.access_token)
                refresh_token = str(token)
                response = {
                    'refresh': refresh_token,
                    'access': access_token
                }
                return Response(response, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request):

        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already in use', 'status': 'danger'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response({'error': str(e), 'status': 'danger'}, status=status.HTTP_400_BAD_REQUEST)
        except APIException as e:
            return Response({'error': str(e.detail), 'status': 'danger'}, status=e.status_code)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        

        user = User.objects.filter(email=email).first()
        print(user)
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')


        token = RefreshToken.for_user(user)

        token['id'] = user.id
        token['email'] = user.email

        response_data = {
            'refresh': str(token),
            'access': str(token.access_token),
        }

        return Response(response_data)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Successfully Logout", status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)