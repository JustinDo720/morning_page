<template>
  <div class="newsContainer">
    <div
      v-for="(news, news_id) in news_from_request"
      :key="news_id"
      class="newsBox light-blue lighten-5"
    >
      <a :href="news.link">
        <p class="flow-text indigo-text darken-3">
          {{ news.title }}
        </p>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Home News",
      news_from_request: []
    };
  },
  created() {
    const options = {
      method: "GET",
      url: process.env.VUE_APP_YAHOO_NEWS_URL,
      headers: {
        "x-rapidapi-key": process.env.VUE_APP_API_KEY,
        "x-rapidapi-host": process.env.VUE_APP_YAHOO_HOST
      }
    };

    axios
      .request(options)
      .then(response => {
        let all_news = response.data.item;
        let news_info = [];

        for (let news_id in all_news) {
          let news = all_news[news_id];

          if (news.description) {
            let info = {
              description: news.description,
              title: news.title,
              link: news.link
            };
            news_info.push(info);
          } else {
            let info = { title: news.title, link: news.link };
            news_info.push(info);
          }
        }
        this.news_from_request = news_info;
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}

h3 {
  color: black;
}

.newsBox {
  border-radius: 5%;
  margin: 10px;
  padding: 5px;
}

.newsContainer {
  overflow-y: scroll;
  max-height: 700px;
}
</style>
