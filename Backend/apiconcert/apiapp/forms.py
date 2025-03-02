from django import forms
from django.db import models
from .models import concertdata

class userform(forms.Form):
    username=forms.CharField(max_length=20)
    email=forms.EmailField(max_length=40)
    password=forms.CharField(max_length=40)
    confirm_password=forms.CharField(max_length=40)

class concertForm(forms.ModelForm):
    class Meta:
        model=concertdata
        fields='__all__'

class ticketform(forms.Form):
    concertname=forms.CharField(max_length=20)
    ticketcount=forms.IntegerField()

class viewbooking(forms.Form):
    pass