from . import views
from django.urls import path

urlpatterns = [
    path('rooms/', views.RoomView.as_view(), name='room-list'),
    path('rooms/create/', views.RoomView.as_view(), name='room-list'),
    path('rooms/delete/<int:pk>/', views.RoomView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.RoomView.as_view(), name='room-detail'),
    path('messages/<str:room_name>', views.MessageListCreate.as_view(), name='message-list-create'),
]