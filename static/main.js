var app = new Vue({
  methods: {
    postTweet: function(newTweet) {
      if (this.newTweet.name.length < 1 || this.newTweet.name.length > 50) {
        this.invalidName = true;
      } else if (
        this.newTweet.message.length < 1 ||
        this.newTweet.message.length > 50
      ) {
        this.invalidMessage = true;
      } else {
        $.ajax({
          url: "/api/v1/tweets/",
          method: "POST",
          data: this.newTweet,
          success: data => {
            this.tweets.unshift(data);
            this.newTweet.message = "";
            this.newTweet.name = "";
            this.invalidName = false;
            this.invalidMessage = false;
          },
          error: (XHR, textStatus, errorThrown) => {
            alert(
              "There was a problem posting the tweet: " +
                textStatus +
                " " +
                errorThrown
            );
          }
        });
      }
    },
    refreshTweets: function() {
      $.ajax({
        url: "/api/v1/tweets/",
        method: "GET",
        success: data => {
          this.tweets = data;
        },
        error: (XHR, textStatus, errorThrown) => {
          alert(
            "There was a problem getting the tweets: " +
              textStatus +
              " " +
              errorThrown
          );
        }
      });
    }
  },
  data: function() {
    return {
      invalidName: false,
      invalidMessage: false,
      newTweet: {
        name: "",
        message: ""
      },
      tweets: []
    };
  },
  created: function() {
    this.refreshTweets();
  },
  filters: {
    showDate: function(value) {
      if (!value) return "";
      let valueDate = new Date(value);
      return valueDate.toString();
    }
  }
});

app.$mount("#app");
