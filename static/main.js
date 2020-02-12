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
          data: this.newTweet
        }).done(data => {
          this.tweets.unshift(data);
        });
        this.newTweet.message = "";
        this.newTweet.name = "";
        this.invalidName = false;
        this.invalidMessage = false;
      }
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
    $.ajax({
      url: "/api/v1/tweets/",
      method: "GET"
    }).done(data => {
      this.tweets = data;
    });
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
