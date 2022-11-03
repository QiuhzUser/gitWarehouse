1)开发 floor 组件

切记；仓库当中的 state 数据格式，取决于服务器返回的数据

1.1 这个 getFloorList 这个 action 在哪里触发，需要在 Home 路由组件中发
需要 v-for 遍历 floor 组件

1.2 v-for 也能在自定义组件上使用

1.3 组件通信的方式有哪些？ 面试频率极高
props：用于父子组件通信
自定义事件：@on @emit 可以实现子给父通信
全局事件总线： $bus 全能
pubsub-js: vue 当中几乎不用
插槽
vuex

2)search 模块开发
1：先静态页面+拆分静态页面
2：发请求（API）
3：vuex 三连环
4：组件获取仓库数组，动态展示数组
