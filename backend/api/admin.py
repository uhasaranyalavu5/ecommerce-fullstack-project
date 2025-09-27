# backend/api/admin.py

from django.contrib import admin
from .models import CustomUser, Product, Customer, Order, OrderItem

# We will create custom admin views to make the interface more useful

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'created_at')
    search_fields = ('name', 'description')

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'last_name', 'email')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0 # Don't show extra empty forms

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status',)
    inlines = [OrderItemInline]

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)