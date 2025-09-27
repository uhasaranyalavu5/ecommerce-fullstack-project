# backend/api/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Product, Customer, Order, OrderItem

# This custom admin configuration is necessary for a custom user model
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # You can customize the admin display here if needed
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'created_at')
    search_fields = ('name', 'description')

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'last_name', 'email')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status',)
    inlines = [OrderItemInline]

# Register your models here.
admin.site.register(CustomUser, CustomUserAdmin) # Use the new custom admin
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)