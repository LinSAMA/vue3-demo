// 订单相关 api
import request from '@/utils/request'

// 获取确定订单信息
export const postOrderConfirm = (data) => request({
  method:'POST',
  url:'/order/confirm',
  data
})

// 创建订单
export const postCreateOrder = (orderKey,data) => request({
  method:'POST',
  url:`/order/create/${orderKey}`,
  data
})

// 获取订单列表
export const getOrderList = () => request({
  method:'GET',
  url:'/order/list'
})

// 根据 ID 获取订单详情
export const getOrderDetailById = (orderId) => request({
  method:'GET',
  url:`/order/detail/${orderId}`
})

// 获取用户收件地址
export const getAddressList = (params) => request({
  method:'GET',
  url:'/address/list',
  params
})

// 获取省市区列表
export const getCityList = () => request({
  method:'GET',
  url:'/city_list'
})

// 新增/编辑 地址
export const postEditAddress = (data) => request({
  method:'POST',
  url:'/address/edit',
  data
})