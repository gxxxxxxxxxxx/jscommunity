// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mydiv from './mycomponents/mydiv.vue'
import store from './store'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {
  showLoading,
  hideLoading,
  ShowMessageBox
} from './assets/loading';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('my-div', mydiv)


const instance = axios.create({
  baseURL: 'http://localhost:8070/api/v1/',
  timeout: 1000,
});

const baseAPI = axios.create({
  baseURL: 'http://localhost:8070/api/v1/',
  timeout: 1000,
});

const policyAPI = axios.create({
  baseURL: '/',
  timeout: 1000,
});

Vue.prototype.$http = baseAPI
Vue.prototype.$http2 = policyAPI
//异步请求前在header里加入token
baseAPI.interceptors.request.use(

  async config => {

      //showLoading();


      if (config.url === '/user/login' || config.url === '/user/refreshtoken' || config.url === '/user/register') return config;

      config.headers.Authorization = store.state.Authorization;

      let oldToken = store.state.Authorization;

      if (!oldToken) return config;

      const decode = jwtDecode(oldToken);

      let timestamp = Math.round(new Date().getTime() / 1000);

      if (decode.exp - timestamp < 7190) {
        const {
          data: data
        } = await instance({
          method: "POST",
          url: '/user/refreshtoken',
          headers: {
            'Authorization': store.state.Authorization
          }
        })

        store.commit('changeLogin', {
          Authorization: "Bearer " + data.token
        })

      } else {
        console.log(`不够时间刷新，时间为：${decode.exp - timestamp}`);

      }

      return config
    },
    error => {
      return Promise.reject(error);
    });


baseAPI.interceptors.response.use(
  response => {
    hideLoading();

    if (response.config.url === '/user/login') return response;


    return response

  },
  error => {
    console.log(error);

    if (error.response.status === 401) {

      // 返回 401 清除token信息并跳转到登录页面
      ShowMessageBox(error.response.data)

      store.commit('deleteLogin')
      //location.reload()
      store.commit('showDialog', true)

    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })


router.beforeEach(function (to, from, next) {



  if (to.meta.needLogin) {
    if (store.state.loginState) {

      next();
    } else {
      router.push('/home')
      store.commit('showDialog', true)
      store.commit('savaToPath', to.path)
    }
  } else {
    next();
  }
});



/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
