1:编程式路由跳转到当前路由(参数不变)，多次执行会抛出 NavigationDuplicated 错误？
--路由跳转两种形式：声明式导航和编程式导航
--声明式导航没有这类问题，因为 vue-router 底层已经处理好了
1.1 为什么编程式导航进行路由跳转的时候，就有这种警告？
"vue-router": "^3.5.4" ：最新版的 vue-router 引入 promise
1.2 通过给 push 方法传递相应的成功、失败的回调函数，可以捕获当前错误，可以解决
1.3 通过底部代码可以事先解决错误

      this.$router.push(
        {
          name: "search",
          params: { keyword: this.keyword },
          query: { k: this.keyword.toUpperCase() },
        },
        () => {},
        () => {}
      );

这种写法：治标不治本，将来在别的组件苍中 push|replace，编程式导航还是有类似错误

1.4
this:当前组件势力（search）
this.$router 属性：当前的这个属性，属性值是VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route 属性
push:VueRouter 类的一个实例

2：Home 模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器数据进行展示
--动态业务

3：三级联动组件完成
---由于三级联动，在 Home、Search、Detail，把三级联动注册为全局组件
好处：只需注册一次，就可以在项目任何地方使用

4:完成其余静态组件
Html+Css+t 图片资源-----信息【结构、样式、图片资源】

新接口地址：http://gmall-h5-api.atguigu.cn

5:POSTMAN 测试接口
--刚刚经过测试 ApiPost 工具测试，接口没有问题
--如果返回的数据 code 字段 200，代表成功
--整个项目，接口前缀都有/api 字样

6：axios 二次封装
XMLHttpRequest、fetch、JQ、axios
6.1 为什么需要进行二次封装 axios？
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前处理一些业务、响应拦截器，当服务器返回数据以后，处理一些事情

6.2 在项目当中经常有 API 文件夹【axios】
接口当中：路径都带有/api
baseURl:'/api'

6.3 axios 可以参考 git|npm 关于 axios 文档

7：接口统一管理
项目很小：完全可以在组件的生命周期函数中去发请求
项目大：axios.get('xxx')

7.1 跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域
http://localhost:8080/#/home ----前端项目本地服务器
http://gmall-h5-api.atguigu.cn------后台服务器

JSONP、CROS、代理

8:nprogress 进度条的使用

start：进度条开始
done：进度条结束
进度条样式跨域修改

9.vuex 状态管理库
9.1 在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。
9.2 何时使用？
多个组件需要共享数据时 不是所有项目都需要 vuex。 如果项目很大，组件很多，数据很多，数据维护费劲，用 vuex

9.3 vuex 基本使用
9.4 vuex 实现模块式开发
如果项目过大，组件过多，接口也很多，数据也多
模拟 state 存储数据
modules: {
home,
search,
},

10:完成 TypeNav 三级联动展示数据业务
