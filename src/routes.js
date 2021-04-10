import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import UserHeader from "./components/UserHeader.vue";
import UserHome from "./components/UserHome.vue";
import Profile from "./components/Profile.vue";
import Products from "./components/Products.vue";
import IPP from './components/IndividualProductPage.vue';
import APP from './components/AllProductsPage.vue';
import EditProfile from "./components/EditProfile.vue";
import CartItems from './components/Cart/CartItems.vue';
import CartEmpty from './components/Cart/CartEmpty.vue';
import CartPayment from './components/Cart/CartPayment.vue';
import CartShipping from './components/Cart/CartShipping.vue';
import ISP from './components/IndividualShopPage.vue';
import {fb} from './firebase'

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
      path: "/isp", 
      component: ISP
    },
    {
      path: "/user",
      meta: { requiresAuth: true },
      component: UserHeader,
      children:[
        {
          path: "home",
          component: UserHome
        },
        {
          path: "app",
          component: APP
        },
        {
          path: "profile",
          component: Profile
        },
        { 
          path: 'ipp',
          component: IPP,
          name: 'ipp',
          props: true
        },
        { 
          path: 'editprofile',
          component: EditProfile
        },
        {
          path: 'cartitems',
          component: CartItems,
          name: 'cartitems',
          props: true
        },
        {
          path: 'cartempty',
          component: CartEmpty,
          name: 'cartempty'
        },
        { 
        path: 'cartpayment',
        component: CartPayment,
        name: 'cartpayment'
        },
        { 
          path: 'cartshipping',
          component: CartShipping,
          name: 'cartshipping'
          }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;
