from django.urls import path
from .views import RegisterView, LoginView, ImageUpload, UserStatisticsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('uploadimages/',ImageUpload.as_view(),name='uploadimages'),
    path('userstats/', UserStatisticsView.as_view(), name='user-stats'),
]

