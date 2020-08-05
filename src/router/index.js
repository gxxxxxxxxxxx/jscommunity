//import Vue from 'vue'
//import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Navigator = () => import('@/components/home/Navigator')
const Main = () => import('@/components/home/Main')
const Footer = () => import('@/components/home/Footer')
const Content = () => import('@/components/content/Content')
const Edit = () => import('@/components/content/Edit')
const About = () => import('@/components/about/About')
const News = () => import('@/components/news/News')
const Forum = () => import('@/components/forum/Forum')
const Forumlist = () => import('@/components/forum/Forumlist')
const User = () => import('@/components/user/User')



export default new VueRouter({
  mode: 'history',
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
    },
    {
      path: '/forum',
      components: {
        navigator: Navigator,
        main: Forum,
        footer: Footer
      }
    },
    {
      path: '/forumlist',
      name: 'forumlist',
      components: {
        navigator: Navigator,
        main: Forumlist,
        footer: Footer
      },
      props: route => ({
        query: route.query.typeid
      })
    },
    {
      path: '/user',
      name: 'User',
      components: {
        navigator: Navigator,
        main: User,
        footer: Footer
      },
      props: route => ({
        query: route.query.userid
      })
    }
    ]
  }]
})
