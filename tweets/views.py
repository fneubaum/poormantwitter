from django.shortcuts import redirect
from rest_framework.generics import ListCreateAPIView
from .models import Tweet, TweetSerializer


def index(request):
    return redirect("/static/index.html")


class TweetList(ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
