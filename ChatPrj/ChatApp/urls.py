from . import views
from django.urls import path

urlpatterns = [
    path('', views.CreateRoom, name='create-room'),
    path('rooms/', views.RoomView.as_view(), name='room-list'),
    path('rooms/create/', views.RoomView.as_view(), name='room-list'),
    path('rooms/delete/<int:pk>/', views.RoomView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.RoomView.as_view(), name='room-detail'),
    path('messages/<str:room_name>', views.MessageListCreate.as_view(), name='message-list-create'),
    # path('<str:room_name>/<str:username>/', views.MessageView, name='room'),
]