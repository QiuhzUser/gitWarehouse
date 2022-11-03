//当前的这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequests";

//三级联动的接口
///api/product/getBaseCategoryList   get   无参数
//发请求:axios 发请求返回的结果是Promise对象

export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

//获取首页轮播图数据的接口
export const reqGetBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });

//获取floor数据

export const reqGetFloorList = () =>
  mockRequests({ url: "/floor", method: "get" });

// 获取搜索模块  地址：/api/list   请求方式是：post   请求要带参数
//当前这个函数需不需要接收外部传递参数
//当前这个接口(获取搜索模块的数据)，给服务器传递一个默认的参数【至少是一个空对象】
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

//获取产品详情信息的接口   url：/api/item/{ skuId }  请求 ：get
export const reqGetGoodInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

//将产品添加到购物车中(获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车列表数据接口
export const reqGetCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

//删除购物车数据接口   /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//切换购物车商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedbyid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

//获取验证码
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

//注册用户   phone,code,password
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", method: "post", data });

//登录用户   /api/user/passport/login   phone  password    post
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", method: "post", data });

//获取用户信息【需要带用户token向服务器要用户信息】/api/user/passport/auth/getUserInfo
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录  /api/user/passport/logout   get
export const reqLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" });

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取商品订单交易信息  /api/order/auth/trade  get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 提交订单信息接口/api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

// 获取支付订单状态
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });

// 查询提交后个人订单数据 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
