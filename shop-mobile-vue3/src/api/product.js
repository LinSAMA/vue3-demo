import request from '@/utils/request'

// 请求商品列表数据
export const getProductList = (params) => request({
  method:'GET',
  url:'/products',
  params
})
