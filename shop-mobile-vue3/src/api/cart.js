// 购物车相关 api
import request from "@/utils/request";

// 加入购物车
export const postAddCart = (data) =>
  request({
    method: "POST",
    url: "/cart/add",
    data,
  });

// 获取购物车的数据
export const getCartList = (params) => request({
  method:'GET',
  url:'/cart/list',
  params
})

// 修改商品个数
export const postModifyCartNum = (data) => request({
  method:'POST',
  url:'/cart/num',
  data
})