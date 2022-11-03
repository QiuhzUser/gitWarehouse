import Vue from "vue";
import App from "./App.vue";
//三级联动组件
import typeNav from "./components/typeNav";
import Pagination from "./components/Pagination";
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Pagination.name, Pagination);

//引入路由
import router from "@/router";
//引入仓库
import store from "./store";

//引入mockSearch.js---mock数据
import "@/mock/mockServe";

// 完整引入;
// 引入ElementUI组件库;
import ElementUI from "element-ui";
// 引入ElementUI全部样式;
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import { Button, MessageBox } from "element-ui";
// 注册全局组件
Vue.component(Button.name, Button);
// Elementui注册组件时，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入swiper样式

// Vue.use(Swiper);

Vue.config.productionTip = false;

// 统一接口api文件夹里面全部请求函数   包含所有的请求方法
import * as API from "@/api";
import atm from "@/assets/1.gif";
// 引入图片懒加载插件
import VueLazyload from "vue-lazyload";
// 注册插件
Vue.use(VueLazyload, {
  // 图片懒加载默认图
  loading: atm,
});

// 引入表单校验插件
import "@/plugins/validate";

// 引入自定义插件
import myPlugins from "./plugins/myPlugins";
Vue.use(myPlugins);

new Vue({
  el: "#app",
  render: (h) => h(App),
  //全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router 的时候，组件上都拥有$route,$router属性
  router,
  //注册仓库:组件实例 的身上会出现一个属性  $store属性
  store,
});
