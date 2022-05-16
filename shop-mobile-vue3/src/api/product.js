import request from '@/utils/request'

// 请求商品列表数据
export const getProductList = (params) => request({
  method:'GET',
  url:'/products',
  params
})

// 获取商品详情
export const getProductDetail = (productId) => request({
  method:'GET',
  url:`/product/detail/${productId}`
})
