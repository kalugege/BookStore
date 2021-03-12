from django.shortcuts import render
from django.http import HttpResponse
import requests


   
def books(request): 
   
    response = requests.get('http://localhost:7000/api/booksorder')
    books = response.json()
    return render(request , 'books.html' ,{'books': books}) 
