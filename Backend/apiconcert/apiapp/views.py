from rest_framework.response import Response
from rest_framework import status,permissions
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.authtoken.models import Token
from .models import userModel,concertdata,bookticket
from .forms import userform,concertForm,ticketform
from .serializers import ConcertSerializer,TicketSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def signup(request):
    username=request.data.get('username')   
    email=request.data.get('email') 
    password=request.data.get('password')
    confirm_password=request.data.get('confirm_password')
    form=userform(request.data)
    if password==confirm_password:
        if form.is_valid():
            password=make_password(confirm_password)
            user=userModel(username=username,email=email,password=password)
            user.save()
            return Response("account created successfully", status=status.HTTP_201_CREATED)
        else:
            return Response("field error",status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Passwords donot match",status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    if user.is_superuser:
        role='admin'  
    else:
        role='user'
    return Response({'token': token.key,'username':user.username,'role':role},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def create(request):
    form=concertForm(request.data)
    if form.is_valid():
        concert=form.save()
        return Response({'id':concert.id},status=status.HTTP_201_CREATED)
    return Response({'error':'Check the entries'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def viewconcerts(request):
    concerts=concertdata.objects.all()
    serializer=ConcertSerializer(concerts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def viewone(request,id):
    concert=get_object_or_404(concertdata,pk=id)
    serializer=ConcertSerializer(concert)
    return Response(serializer.data)  


@api_view(['PUT'])
@permission_classes([IsAuthenticated,IsAdminUser])
def updateconcert(request,pk):
    concert=get_object_or_404(concertdata,pk=pk)
    form=concertForm(request.data,instance=concert)
    if form.is_valid():
        form.save()
        serializer=ConcertSerializer(concert)
        return Response(serializer.data)
    else:
        return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated,IsAdminUser])
def deleteconcert(request,pk):
    try:
        concert = concertdata.objects.get(pk=pk)
    except concert.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    concert.delete()
    return Response("Concert deleted successfully")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ticketbooking(request):
    if not request.user.is_superuser:
        cname=request.data.get('concertname')
        ticketcount=request.data.get('ticketcount')
        ticketcount=int(ticketcount)
        username=request.user.username
        print(cname)
        print(ticketcount)
        print(username)
        if ticketcount<=3 and ticketcount>0:
            concert=cname
            price=concertdata.objects.filter(concertname=concert).values_list('ticketprice',flat=True)
            price=price[0]
            total=price*ticketcount
            bookingdata={
                'userid':request.user.id,
                'username':username,
                'concertname':concert,
                'ticketprice':price,
                'bookedtickets':ticketcount,
                'totalprice':total
            }
            # print(bookingdata)
            # return Response('working',status=status.HTTP_200_OK)
            serializer=TicketSerializer(data=bookingdata)
            if serializer.is_valid():
                serializer.save()
                availabletickets=concertdata.objects.filter(concertname=concert).values_list('availabletickets',flat=True)
                availabletickets=availabletickets[0]
                availabletickets=availabletickets-ticketcount
                ticketupdate=concertdata.objects.get(concertname=concert)
                ticketupdate.availabletickets=availabletickets
                ticketupdate.save()
                return Response('Tickets Booked Successfully',status=status.HTTP_201_CREATED)
            else:
                return Response('Check input',status=status.HTTP_400_BAD_REQUEST)
        elif ticketcount<=0:
            return Response('Book atleast one ticket',status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('No more than 3 tickets per user',status=status.HTTP_400_BAD_REQUEST)
    return Response('Admin cannot book tickets',status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewbooking(request,uname):
    tickets=bookticket.objects.filter(username=uname)
    if not tickets:
        return Response({'message':'No ticket booked by this user'},status=status.HTTP_404_NOT_FOUND)
    serializer=TicketSerializer(tickets,many=True)
    if serializer:
        return Response(serializer.data)
    else:
        return Response('No data',status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def viewtickets(request):
    tickets=bookticket.objects.all()
    if not tickets:
        return Response('No tickets booked yet',status=status.HTTP_204_NO_CONTENT)
    serializer=TicketSerializer(tickets,many=True)
    if serializer:
        return Response(serializer.data)
    else:
        return Response('No data',status=status.HTTP_404_NOT_FOUND)