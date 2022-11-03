// 对外暴露一个函数

import { reqLogout } from "@/api";

// 存储token
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};
// 获取token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};
// 清除本地存储token
export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
