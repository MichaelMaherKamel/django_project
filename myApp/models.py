from django.db import models


class Book(models.Model):
    Categories = (
        ("C", "Classic"),
        ("R", "Romance"),
        ("M", "Mystery"),
        ("T", "thriller"),
        ("F","fiction"),
    )
    
    
    
    cover_photo = models.ImageField()
    title  = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    author = models.CharField(max_length=100)
    category =  models.CharField(max_length=1, choices=Categories)