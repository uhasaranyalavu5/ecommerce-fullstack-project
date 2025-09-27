from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Product, Customer, Order, OrderItem
from .serializers import (
    ProductSerializer, CustomerSerializer, UserSerializer, 
    OrderSerializer, OrderItemSerializer
)

# Use get_user_model() to correctly refer to your CustomUser
CustomUser = get_user_model()

# --- PRODUCT VIEW ---
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# --- CUSTOMER VIEW ---
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('-created_at')
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

# --- DASHBOARD STATS VIEW ---
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        product_count = Product.objects.count()
        customer_count = Customer.objects.count()
        order_count = Order.objects.filter(status='Placed').count() # Example for future
        stats = {
            'product_count': product_count,
            'customer_count': customer_count,
            'order_count': order_count,
        }
        return Response(stats)

# --- REGISTRATION VIEW ---
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all() # CORRECTED: Uses CustomUser
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

# --- CSRF TOKEN VIEW ---
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

# --- CART VIEWS ---
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        order, created = Order.objects.get_or_create(user=request.user, status='In Cart')
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    def post(self, request):
        order, created = Order.objects.get_or_create(user=request.user, status='In Cart')
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        product = Product.objects.get(id=product_id)
        order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
        if not created:
            order_item.quantity += quantity
        else:
            order_item.quantity = quantity
        order_item.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        try:
            order_item = OrderItem.objects.get(pk=pk, order__user=request.user, order__status='In Cart')
            order_item.delete()
            return Response(status=204)
        except OrderItem.DoesNotExist:
            return Response(status=404)