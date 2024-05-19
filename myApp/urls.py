"""
URL configuration for myApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('borrowed-list/', views.borrowed_list, name='borrowedlist'),
    path('contactus/', views.contact_us, name='contactus'),
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('ourbooks/', views.our_books, name='ourbooks'),
    path('search/', views.search, name='search'),
    path('signup/', views.signup, name='signup'),
    path('userdetails/', views.user_details, name='userdetails'),
    path('logout/', views.logout, name='logout'),
    path('test/', views.test, name='test'),
]

urlpatterns += staticfiles_urlpatterns()