import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import UserHeader from "./components/UserHeader.vue";
import UserHome from "./components/UserHome.vue";
import Profile from "./components/Profile.vue";
import Products from "./components/Products.vue";
import IPP from "./components/IndividualProductPage.vue";
import APP from "./components/AllProductsPage.vue";
import EditProfile from "./components/EditProfile.vue";
import CartItems from "./components/Cart/CartItems.vue";
import CartPayment from "./components/Cart/CartPayment.vue";
import CartShipping from "./components/Cart/CartShipping.vue";
import CartConfirm from './components/Cart/CartConfirm.vue';
import ISP from "./components/IndividualShopPage.vue";
import Shop from "./components/Shop.vue";
import FootBar from "./components/ProfileDashboards/charts/FootBar.vue";
import EcoPoints from "./components/ProfileDashboards/EcoPoints.vue";

import CompanyHeader from "./components/Company/CompanyHeader.vue";
import CompanyHome from "./components/Company/CompanyHome.vue";
import EditDescription from "./components/Company/EditDescription.vue";
import EditProducts from "./components/Company/EditProducts.vue";
import AddProducts from "./components/Company/AddProducts.vue";

import { fb } from "./firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      //for the non-logged-in users
      path: "/products",
      component: Products,
    },
    {
      path: "/shop/:id",
      component: Shop,
      name: "shop",
      props: true,
    },
  
    {
      path: "/user",
      meta: { requiresAuth: true },
      component: UserHeader,
      children: [
        {
          path: "home",
          component: UserHome,
        },
        {
          path: "products",
          component: APP,
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "ipp/:id",
          component: IPP,
          name: "ipp",
          props: true,
        },
        {
          path:"isp/:id",
          component: ISP,
          name: "isp",
          props:true
        },
        {
          path: "editprofile",
          component: EditProfile,
        },
        {
          path: "cartitems",
          component: CartItems,
          name: "cartitems",
          props: true,
        },
        { 
          path: 'cartpayment',
          component: CartPayment,
          name: 'cartpayment',
          props: true
        },
        {
          path: "cartshipping",
          component: CartShipping,
          name: 'cartshipping',
          props: true
        },
        {
          path: 'cartconfirm',
          name: 'cartconfirm',
          component: CartConfirm,
          props: true
        },
        {
          path: "footbar",
          component: FootBar
        },
        {
          path: "ecopoints",
          component: EcoPoints
        },
      ],
    },
    {
      path: "/company",
      //meta: { requiresAuth: true },
      component: CompanyHeader,
      children: [
        {
          path: "home",
          component: CompanyHome,
          name: "companyHome",
          props: true,
        },
        {
          path: "editDescription",
          component: EditDescription,
          name: "editDescription",
          props: true,
        },
        {
          path: "editProducts",
          component: EditProducts,
          name: "editProducts",
          props: true,
        },
        {
          path: "addProducts",
          component: AddProducts,
          name: "addProducts",
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;