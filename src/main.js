import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import {firebase}   from './firebase'
import 'bootstrap';
import './assets/app.scss';

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
    
  }

});

