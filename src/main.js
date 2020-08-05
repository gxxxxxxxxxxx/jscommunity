// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import mydiv from './mycomponents/mydiv.vue'
import store from './store'
import jwtDecode from 'jwt-decode';

import {
    showLoading,
    hideLoading,
    ShowMessageBox
} from './assets/loading';
import Vue from 'vue';


Vue.config.productionTip = false

Vue.component('my-div', mydiv)


const instance = axios.create({
    baseURL: 'https://ganxx.cn/api/api/v1',
    timeout: 10000,
});
//http://localhost:8070/api/v1/
const baseAPI = axios.create({
    baseURL: 'https://ganxx.cn/api/api/v1',
    timeout: 10000,
});

const policyAPI = axios.create({
    baseURL: '/',
    timeout: 10000,
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

        if (decode.exp - timestamp < 3600) {
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
                Authorization: "Bearer " + data.token,
                username: data.username
            })
        } else {
            //console.log(`不够时间刷新，时间为：${decode.exp - timestamp}`);
        }
        return config
    },
    error => {
        return Promise.reject(error);
    });


baseAPI.interceptors.response.use(
    response => {
        hideLoading();

        // if (response.config.url === '/user/login') return response;


        return response

    },
    error => {


        if (error.response.status === 401) {

            // 返回 401 清除token信息并跳转到登录页面
            // ShowMessageBox(error.response.data)

            store.commit('deleteLogin')
            location.reload()
                // store.commit('showDialog', true)

            // router.push('/home')

        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    })


router.beforeEach(function(to, from, next) {

    NProgress.start();
    if (to.meta.needLogin) {

        if (store.state.loginState) {

            if (from.name === 'Post' || from.name === 'forumlist' && to.fullPath === '/edit') {


                from.name === 'forumlist' ? to.params.typeid = from.query.typeid : to.params.typename = from.params.typename
            }

            next();
        } else {
            if (to.fullPath === '/edit' && from.fullPath === '/') router.push('/home');
            store.commit('showDialog', true)
            store.commit('savaToPath', to.path)
                // ShowMessageBox('请登录后再发帖')
        }
    } else {
        next();
    }
});

router.afterEach(transition => {
    NProgress.done();
});


/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
})