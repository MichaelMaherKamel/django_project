# from django.shortcuts import render
# from django.contrib.auth.models import User
# 

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout 
from .forms import SignupForm, LoginForm
from django.http import JsonResponse


def borrowed_list(request):
    return render(request, 'borrowedList.html')

def contact_us(request):
    return render(request, 'contactUs.html')

def index(request):
    return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout(request):
    logout(request)
    return redirect('login')

def our_books(request):
    return render(request, 'ourBooks.html')

def search(request):
    return render(request, 'search.html')

# def signup(request):
#     return render(request, 'signup.html')


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {'form': form})

def user_details(request):
    return render(request, 'userDetails.html')

def adminHome(request):
    return render(request, 'adminHome.html')

def test(request):
    return JsonResponse({"Message": "Hello World!"})