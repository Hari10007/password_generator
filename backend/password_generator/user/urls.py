from django.urls import path
from .views import RegisterView, RefreshTokenView, LoginView, LogoutView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('refresh-token/', RefreshTokenView.as_view(), name='refresh_token'),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view())
]

