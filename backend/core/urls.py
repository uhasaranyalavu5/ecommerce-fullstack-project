# backend/core/urls.py

from django.contrib import admin
from django.urls import path, include

# Import the views from the simplejwt library
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import RegisterView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Add these two lines for getting and refreshing tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]