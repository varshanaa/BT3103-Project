import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import IPP from './components/IndividualProductPage.vue'
import APP from './components/AllProductsPage.vue'
import {firebase} from './firebase'

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {   //for the non-logged-in users
        path: "/products",
        component: Products
    },
    {
      path: "/user",
      component: User,
      meta: { requiresAuth: true },
      children:[
        {
          path: "app",
          component: APP
        },
        {
          path: "profile",
          component: Profile
        },
        { 
          path: '/ipp',
          component: IPP,
          name: 'ipp',
          props: true
        }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;