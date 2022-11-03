// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

//使用插件
Vue.use(VueRouter);
// 引入store
import store from "@/store";

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push||replace
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败回调
//call||apply区别：
// 相同点:都可以调用函数一次，都可以篡改函数的上下文
//不同点：call||apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行   y=0代表滚动条在最上方
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to：获取到你要跳转到哪个路由的信息
  // from：获取到你从哪个路由而来的信息
  // next：放行函数   next()放行，next('/login')放行到指定路由           next(false)
  next();
  // 用户登录了才有token  ，未登录没有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    // 已经登录了还想去login  不能
    if (to.path === "/login") {
      next("false");
    } else {
      // 登陆了不是去login
      // 如果用户名已有
      if (name) {
        next();
      } else {
        // 没有用户信息;
        // 派发action让仓库存储用户信息再跳转;
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (err) {
          // token失效了  ,获取不到用户信息，重新登录
          // 清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 用户未登录情况，不能去交易相关，不能去支付相关【pay|paysuccess】不能去个人中心
    // 未登录去上述路由，全部跳转登录页面
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      // 把想去但未去的路由信息，存储于地址栏中
      next("/login?redirect=" + toPath);
    } else {
      // 去的不是上述路由全部放行
      next();
    }
  }
});

export default router;
