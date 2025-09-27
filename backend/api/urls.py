# backend/api/urls.py

from rest_framework.routers import DefaultRouter
from django.urls import path # Make sure path is imported
from .views import ProductViewSet, DashboardStatsView, CustomerViewSet,CartView, CartItemView # Import the new view

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'customers', CustomerViewSet, basename='customer')

# Start with the router's URLs, then add our custom path
urlpatterns = router.urls + [
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('cart/', CartView.as_view(), name='cart-view'),
    path('cart/items/<int:pk>/', CartItemView.as_view(), name='cart-item-view'),

]