// 登录相关 api
import request from '@/utils/request'

// 获取用户验证码
export const getUserVerifyCode = () => request({
  method:'GET',
  url:'/verify_code'
})

// 获取短信验证码
export const postVerifyCode = (data) => request({
  method:'POST',
  url:'/register/verify',
  data
})

// 密码登录
export const postLoginByPsd = (data) => request({
  method:'POST',
  url:'/login',
  data
})

// 验证码登录
export const postLoginByCode = (data) => request({
  method:'POST',
  url:'/login/mobile',
  data
})

// 获取用户信息
export const getUserInfo = () => request({
  method:'GET',
  url:'/user'
})