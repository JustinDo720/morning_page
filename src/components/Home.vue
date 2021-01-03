<template>
  <div id="app-container" class="grid-container">
    <div class="quote-of-day card">
      <div class='card-content'>
        <h4>
            {{ r1l_title }}
        </h4>
        <h1>
          Difficulties increase the nearer we get to the goal.
        </h1>>
        <h4>
          -- Johann Wolfgang von Goethe
        </h4>
        <!--<home_quote_of_day></home_quote_of_day> -->
      </div>
    </div>

    <div class="todo card">
      <div class='card-content'>
        <h4>
          {{r1m_title}}
        </h4>
        <home_todo></home_todo>
      </div>
    </div>

    <div class="news card">
      <div class='card-content'>
        <h4>
          {{ r1r_title }}
        </h4>
        <h4 data-v-8dc7cce2="">News</h4><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/2b0a93c2-d190-336d-a5b7-54f8d7b97500/bold-prediction%3A-general.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Bold Prediction: General Motors Is the Next Apple Stock for Investors</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/news/benzingas-final-bulls-bears-alibaba-162530018.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Benzinga's Final Bulls And Bears Of The Year: Alibaba, Apple, Intel, Tesla And More</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/b9cdc2cf-a61e-36b0-b764-166c5e094109/why-apple-rose-12.3%25-in.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Why Apple Rose 12.3% in December</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/news/exploding-debt-levels-mean-stocks-221234260.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Exploding Debt Levels Mean Stocks Can't Go ‘To the Moon’&nbsp;Forever</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/daa6e775-09c1-3e0b-83e0-5ddb6ab56433/apple-stock%3A-buy%2C-sell%2C-or.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Apple Stock: Buy, Sell, or Hold After Soaring 81% in 2020?</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/55936da7-0b9c-39f5-b471-0c6551a229bc/square-and-paypal-shouldn%27t.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Square and PayPal Shouldn't Fear Google's Fintech Push</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/news/best-worst-dow-stocks-2020-215552073.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">The Best and Worst Dow Stocks From 2020</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/72049339-a3bb-3224-986d-d8556854ab12/there%E2%80%99s-reason-to-be-hopeful.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">There’s Reason to Be Hopeful About Intel Stock in 2021. Here’s Why.</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/c33b62ff-8e23-30df-8ce9-1695ec1c806c/apple-leads-dow-jones-stocks.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Apple Leads Dow Jones Stocks In 2020 But Q4 Winner Dominates</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/65b53896-faf4-3a06-9d0d-a63cf3c83192/dow-jones-stocks-to-buy-and.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Dow Jones Stocks To Buy And Watch In December 2020: Apple Eyes New Buy Point</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/news/4-top-stock-trades-monday-205221463.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">4 Top Stock Trades for Monday: AAPL, GLD, MRNA, CMI</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/9eb13eb0-24b0-3deb-9013-a0651d2a2abb/these-7-value-stocks-deserve.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">These 7 Value Stocks Deserve a Fresh Look in 2021</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/video/see-value-dogs-dow-kendall-201405048.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">We see value in the ‘dogs of the DOW’: Kendall Capital CEO</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/8a9bb70b-954f-3971-9448-b737298a8ac3/dow-jones-gains-as-schumer.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Dow Jones Gains As Schumer Offers McConnell Stimulus Bargain; Tesla Surges, Apple Falls Again</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/d8629cd3-0a89-3a0e-9091-bed4e56c9f69/big-tech-has-an-antitrust.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Big Tech has an antitrust target on its back, and it is only going to get bigger</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/80a2d720-9b22-30ea-bc05-874d5dcf4f16/what-mark-zuckerberg-and.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">What Mark Zuckerberg and Cornelius Vanderbilt Have In Common</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/video/movie-industry-strengthen-again-around-193555079.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">The movie industry will strengthen again around ‘April or May’: Screenvision CEO</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/87f6a358-58a2-318c-a17b-a7a514da8c6e/how-to-invest-in-stocks%3A.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">How To Invest In Stocks: Stock Market Investing For Beginners In 2021</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/8f9abdd4-8a67-3548-bddb-8285c92d9dba/dow-jones-flat-as-stock.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Dow Jones Flat As Stock Market Set To Close 2020 Near Record Highs</h3></a></div><div data-v-3077afae=""><a href="https://finance.yahoo.com/m/ba63866c-722e-3876-ae16-a27b122f6dc8/apple-iphone-12-pro-demand.html?.tsrc=rss" data-v-3077afae=""><h3 data-v-3077afae="">Apple iPhone 12 Pro Demand Strong, Says J.P. Morgan</h3></a></div>
        <!--<home_news></home_news>-->
      </div>
    </div>

    <div class="weather card">
      <div class='card-content'>
        <h4>
          {{ r2l_title }}
        </h4>
        <h4 data-v-8dc7cce2="">Weather</h4><h1>London</h1><h2>34°F</h2><h3>Clouds</h3>
        <!--<home_weather></home_weather>-->
      </div>
    </div>

  </div>
</template>

<script>

import home_todo from '@/components/home_child_component/home_todo'
//import home_news from "@/components/home_child_component/home_news";
//import home_quote_of_day from "@/components/home_child_component/home_quote_of_day";
//import home_weather from "@/components/home_child_component/home_weather";


export default{
  name: 'home_page',
  components: {
    home_todo,
    //home_quote_of_day,
    //home_news,
    //home_weather,
  },
  data(){
    return{
      r1l_title: 'Quote of the Day', //* row 1 left title
      r1m_title: 'To-Do List', //* row 1 middle title
      r1r_title: 'News', //* row 1 right title
      r2l_title: 'Weather', //* row 2 left title
      todo: []
    }
  }
}
</script>

<style scoped>
/* Grid Container */
.grid-container{
  display:grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(100px,auto);
  align-items: start;
  margin: 10px;
  margin-left: 5px;
}
.grid-container > div{
  background: cadetblue;
  text-align:center;
  overflow:hidden;
}
.grid-container > div:nth-child(odd){ /* > means for every div tag and here :nth-child just alternates */
  background: cornflowerblue;
  text-align:center
}

/* To-Do List */
.todo{
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 5;
}

/* Weather */

.weather{
  align-items: start;
  grid-column-start: 1;
  grid-row-start: 2;
  grid-row-end: 3;
}

/* News */

.news{
  grid-column-start:3;
  grid-row-start: 1;
  grid-row-end: 5;
}


/* Quote of the Day */
.quote-of-day{
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}
</style>