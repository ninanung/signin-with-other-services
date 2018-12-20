import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import NotFound from './components/NotFound.vue'
import Main from './components/Main.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'main', component: Main },
        { path: '*', component: NotFound },
    ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
