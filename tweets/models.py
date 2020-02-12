from django.db import models
from rest_framework.serializers import ModelSerializer


class Tweet(models.Model):
    name = models.CharField(max_length=50, null=False)
    message = models.CharField(max_length=50, null=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Message by " + self.name 
    

    class Meta:
        ordering = ["-created", "name"]


class TweetSerializer(ModelSerializer):
    class Meta:
        model = Tweet
        fields = ["name", "message", "created"]
