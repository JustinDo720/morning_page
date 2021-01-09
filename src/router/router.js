import { createWebHistory, createRouter } from "vue-router";
import home_page from "@/components/Home";
import todo from "@/components/todo-list";
import login from "@/components/login.vue";
import register from "@/components/register.vue";
import firebaseApp from "@/components/db";
import Modal from '@/components/utilities/Modal'

let history = createWebHistory();
let routes = [
  { path: "/", component: home_page },
  { path: "/todo", component: todo, meta: { requiresAuth: true } }, // requiresAuth acts like a guard
  { path: "/login", component: login, meta: { requiresGuest: true } },
  { path: "/register", component: register, meta: { requiresGuest: true } },
  {path:'/test_modal',component: Modal}
];

const router = createRouter({
  history,
  routes
});

// Nav guard activators
router.beforeEach((to, from, next) => {
  // Check for requirements before each routes
  // If this is true then this route requires authentication.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Now we need to check if the user is logged in or not
    if (!firebaseApp.auth().currentUser) {
      // This is how we get our user
      // Go to login page is the user is not logged in
      next({
        path: "/login",
        query: {
          // If we are not logged in we will redirect user to login page
          redirect: to.fullPath
        }
      });
    } else {
      // This means that we are logged in
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Now we are testing for requriesGuest
    // Now if the user is logged in then they're no longer guests
    if (firebaseApp.auth().currentUser) {
      // Redirect them to home page
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // If no guard then we good to go
    next();
  }
});

export default router;
