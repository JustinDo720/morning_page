# Morning Page!

---
<p>
    This Project is based on creating an interactive home page
    that allows users to see the current weather, some news article, and
    if they have anything on their mind, they could write it on the todo list
</p>

---

## Objectives
* [x] To-do List
* [x] Weather App
* [x] News App
* [x] Quote of the Day
* [x] Deploy with Netlify or maybe Firebase Hosting


### Mini goals
* [x] Tied Vue with Firebase realtime database
* [x] Used axios to fetch and post data
* [x] Tie the child component to Home.Vue
* [x] Refactor To-do List code. Is there a way to reduce the amount of GET request?

## Problems:
1. There was a big problem with planning. I wasted some time building the todo-list feature on a separate router
instead of focusing on a single page application.
1. Given that it's my first project with vue and firebase, things were not good when I tried to tie them together. One 
big issue was repeating code and building get requests. After getting a promise I decided for another get request to
not refresh to page. This could've been fixed earlier on if I just saved the data to our data function.
1. Styling. I had to style everytime because it just didn't look right. I used materializecss cdn for this project
and I do not know how to implement the modal. So, I had to create one from scratch, but I knew how to use slots which 
solved that issue.
1. 3 api. There is still an issue about this being that the news api is loading slower than the others which makes the 
page look synchronized.

