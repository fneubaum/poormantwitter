from django.test import TestCase, Client
from tweets.models import Tweet


class TweetTestCase(TestCase):
    def setUp(self):
        Tweet.objects.create(name="First", message="First Message")
        Tweet.objects.create(name="Second", message="Second Message")
        Tweet.objects.create(name="Third", message="Third Message")
        self.client = Client()

    def test_tweets_were_saved(self):
        first = Tweet.objects.get(pk=1)
        second = Tweet.objects.get(pk=2)
        third = Tweet.objects.get(pk=3)
        self.assertEqual(first.name, "First")
        self.assertEqual(second.name, "Second")
        self.assertEqual(third.name, "Third")

    def test_get_tweets_in_order(self):
        response = self.client.get("/api/v1/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["name"], "Third")
        self.assertEqual(response.json()[1]["name"], "Second")
        self.assertEqual(response.json()[2]["name"], "First")

    def test_post_tweet(self):
        response = self.client.post(
            "/api/v1/tweets/", {"name": "john", "message": "Hello!"}
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "john")
        self.assertEqual(response.json()["message"], "Hello!")

    def test_methods_not_allowed(self):
        response_delete = self.client.delete("/api/v1/tweets/")
        response_put = self.client.put("/api/v1/tweets/")
        self.assertEqual(response_delete.status_code, 405)
        self.assertEqual(response_put.status_code, 405)
