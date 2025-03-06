from django.contrib import admin
from django.urls import path
from apiapp import views

urlpatterns = [
    path('signup/',views.signup,name='signup'),
    path('login/',views.login,name='login'),
    path('create-concert/',views.create,name='create-concert'),
    path('view-concerts/',views.viewconcerts,name='view-concerts'),
    path('view-concerts/<int:id>',views.viewone,name='view-concerts'),
    # path('view-tickets/<str:uname>',views.viewbooking,name='viewbooking'),
    path('view-tickets/',views.viewtickets,name='viewtickets'),
    path('update-concert/<int:pk>',views.updateconcert,name='update-concert'),
    path('delete-concert/<int:pk>',views.deleteconcert,name='delete-concert'),
    path('book-ticket/',views.ticketbooking,name='book-ticket'),
]