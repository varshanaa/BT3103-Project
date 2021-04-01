import Vue from "vue";
import App from "./App.vue";
import routes from "./routes";
import jQuery from 'jquery';
import {fb} from './firebase'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')


Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})


Vue.use(VueFirestore)

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import PortalVue from 'portal-vue'

Vue.use(PortalVue)

import Swal from 'sweetalert2';

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;


Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function() {

  if(!app){
    new Vue({
      routes,
      render: h => h(App)
    }).$mount("#app");
    
  }

});
