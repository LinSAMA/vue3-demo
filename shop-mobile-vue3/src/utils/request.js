import axios from "axios";
import store from "@/store";
import router from '@/router'
const request = axios.create({
  baseURL: "https://shop.fed.lagounews.com/api",
});

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { token } = store.state.user;
  if(token) {
    // 设置请求头
    config.headers.Authorization = 'Bearer ' + token
  }
  return config;
});

// 相应拦截器
request.interceptors.response.use(function(config) {
  if(config.data.status === 410000) {
    router.push({
      name:'login',
      query:{
        redirect:router.currentRoute.fullPath
      }
    })
  }
  return config
})

export default request;
