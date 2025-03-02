from django.db import models
from django.contrib.auth.models import AbstractUser

class userModel(AbstractUser):
    username=models.CharField(max_length=20,blank=False,unique=True)
    email=models.CharField(max_length=40,blank=False,unique=True)
    first_name=None
    last_name=None

    USERNAME_FIELD='username'
    REQUIRED_FIELDS=['email','password']

class concertdata(models.Model):
    concertname=models.CharField(max_length=20)
    concertdate=models.DateField()
    concerttime=models.TimeField()
    concertvenue=models.CharField(max_length=20)
    ticketprice=models.DecimalField(max_digits=10,decimal_places=2)
    availabletickets=models.IntegerField()

class bookticket(models.Model):
    userid=models.IntegerField(blank=False)
    username=models.CharField(max_length=20,blank=False)
    concertname=models.CharField(max_length=20,blank=False)
    ticketprice=models.DecimalField(max_digits=10,decimal_places=2,blank=False)
    bookedtickets=models.IntegerField(blank=False)
    totalprice=models.DecimalField(max_digits=12,decimal_places=2,blank=False)