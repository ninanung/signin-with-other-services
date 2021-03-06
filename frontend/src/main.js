import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import NotFound from './components/NotFound.vue'
import Main from './components/Main.vue'
import GithubLogin from './components/logins/github/GithubLogin.vue';
import User from './components/logins/User.vue';
import GoogleLogin from './components/logins/google/GoogleLogin.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'main', component: Main },
        { path: '/githublogin', name: 'githublogin', component: GithubLogin },
        { path: '/googlelogin', name: 'googlelogin', component: GoogleLogin },
        { path: '/user', name: 'user', component: User},
        { path: '*', component: NotFound },
    ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
