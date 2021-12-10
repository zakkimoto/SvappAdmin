import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import emailjs from 'emailjs-com';
import App from './App.vue'
import Login from './views/Login.vue'
import Secure from './views/Secure.vue'
import Recover from './views/Recover.vue'
import Home from './views/Home.vue'
//import Numbers from './views/Numbers.vue'
import Users from './views/Users.vue'
import Messages from './views/Messages.vue'
import axios from 'axios';
import User from './views/User.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import geocoder from 'geocoder'
import Properties from './views/Properties.vue'
import ZoomOnHover from "vue-zoom-on-hover";


Vue.prototype.$http = axios;



Vue.config.productionTip = false

// Global scope

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(emailjs);
Vue.use(axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDImhMtVnZfl8Iim3YJqTbZLsHYs75NuLg',
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});
Vue.use(geocoder);
Vue.use(ZoomOnHover);


// hér höldum við utanum hvort að starfsmaður sé búinn að skrá sig inn.

const store = new Vuex.Store(
  {
    state: {
      authenticated: false
    },
    mutations: {
      setAuthentication(state, status){
        state.authenticated = status;
      }
    }
  }
);

// allar síður sem starfsmaður getur farið inná

const router = new VueRouter(
  {
    routes: [
      {
        path: '/',
        redirect: {
          name: "login"
        }

      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/secure',
        name: 'secure',
        component: Secure,
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next('/home');
          }
        }
      },
      {
        path: '/recover',
        name: 'recover',
        component: Recover,
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        }
      },
      /*
      {
        path: '/numbers',
        name: 'numbers',
        component: Numbers,
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        }
      },*/
      {
        path: '/users',
        name: 'users',
        component: Users,
        
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        } 
      },
      {
        path: '/messages',
        name: 'messages',
        component: Messages,
        
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        }
        
      },
      {
        path: '/properties',
        name: 'properties',
        component: Properties,
        
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        }
        
      },

      {
        path: '/users/:id',
        name: 'user',
        component: User,
        
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
            next('/login');
          }else{
            next();
          }
        }
      },


  ]
});

// færum öll components og attributes yfir í app.vue svo við getum notað það allstaðar

new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')
