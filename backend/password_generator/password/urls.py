from django.urls import path
from .views import PasswordSaveView, ListPasswordView

urlpatterns = [
    path('save', PasswordSaveView.as_view()),
    path('list', ListPasswordView.as_view()),
]

