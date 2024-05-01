from django.shortcuts import render, redirect
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RoomSerializer , MessageSerializer , RoomCreateSerializer

class RoomView(APIView):
    def get(self, request, format=None):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = RoomCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        room = Room.objects.get(pk=pk)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()   
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        room = Room.objects.get(pk=pk)
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MessageListCreate(APIView):
    def get(self, request, room_name):
        try:
            messages = Message.objects.filter(room__room_name=room_name)
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Message.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)