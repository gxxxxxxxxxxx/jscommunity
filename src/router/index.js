import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Navigator = () => import('@/components/home/Navigator')
const Main = () => import('@/components/home/Main')
const Footer = () => import('@/components/home/Footer')
const Content = () => import('@/components/content/Content')
const Edit = () => import('@/components/content/Edit')

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
          footer: Footer
        }
      },
      {
        path: '/post',
        components: {
          navigator: Navigator,
          main: Content,
          footer: Footer
        }
      },
      {
        path: '/edit',
        components: {
          navigator: Navigator,
          main: Edit,
          footer: Footer
        }
      }
    ]
  }]
})
