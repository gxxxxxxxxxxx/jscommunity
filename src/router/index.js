import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Navigator = () => import('@/components/home/Navigator')
const Main = () => import('@/components/home/Main')
const Footer = () => import('@/components/home/Footer')
const Content = () => import('@/components/content/Content')
const Edit = () => import('@/components/content/Edit')
const About = () => import('@/components/about/About')
const News = () => import('@/components/news/News')

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
        name: 'Post',
        components: {
          navigator: Navigator,
          main: Content,
          footer: Footer
        },
        props: route => ({
          query: route.query.pageid
        })
      },
      {
        path: '/edit',
        components: {
          navigator: Navigator,
          main: Edit,
          footer: Footer,
        },
        meta: {
          needLogin: true,
        }
      },
      {
        path: '/about',
        components: {
          navigator: Navigator,
          main: About,
          footer: Footer
        }
      },
      {
        path: '/news',
        components: {
          navigator: Navigator,
          main: News,
          footer: Footer
        }
      }
    ]
  }]
})
