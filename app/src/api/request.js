//对于axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//在当前模块引入store
import store from "@/store";
//引入进度条样式
import "nprogress/nprogress.css";
//start：进度条开始   done：进度条结束

//1:利用axios对象的方法create，去创建一个axios实例
//request就是axios，只不过可以稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径当中会出现/api
  baseURL: "/api",
  //请求超时时间5s
  timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出之前做一些事情
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，headers请求头
  //进度条开始动
  if (store.state.detail.uuid_token) {
    //给请求头添加一个字段:和后台商量好的
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
