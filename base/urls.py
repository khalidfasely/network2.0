from django.urls import path
from . import views

urlpatterns = [
    #path("", views.index, name="index"),
    #path("products/", views.getProducts, name="products"),

    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('get_user/', views.getUser.as_view(), name='get_user'),
    path('register/', views.registerUser.as_view(), name='register'),
]