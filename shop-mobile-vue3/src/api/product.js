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

// 获取评论个数
export const getCommentCount = (productId) => request({
  method:'GET',
  url:`/reply/config/${productId}`
})

// 根据分类获取评论
export const getCommentByType = (productId,params) => request({
  method:'GET',
  url:`/reply/list/${productId}`,
  params
})