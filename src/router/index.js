import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Navigator = () => import('@/components/home/Navigator')
const Main = () => import('@/components/home/Main')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [{
      path: '/home',
      components: {
        navigator: Navigator,
        main: Main,
      }
    }]
  }]
})
