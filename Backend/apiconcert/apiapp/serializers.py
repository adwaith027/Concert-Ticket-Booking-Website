from rest_framework import serializers
from .models import concertdata,bookticket

class ConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = concertdata
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = bookticket
        fields = '__all__'