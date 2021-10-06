import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import emailjs from 'emailjs-com';
import App from './App.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Recover from './components/Recover.vue'
import Home from './components/Home.vue'
import Numbers from './components/Numbers.vue'
import Users from './components/Users.vue'
import Messages from './components/Messages.vue'



Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(emailjs);




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
            next();
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
      },
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

  ]
});

new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')
