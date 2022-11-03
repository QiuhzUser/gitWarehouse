5)路由组件的搭建
vue-router
在上面分析的时候，路由组件应该有四个：Home，Login，Search，Register
-compoments 文件夹：经常放置的非路由组件（公用全局组件）
-pages|views 文件夹：经常放置路由文件

5.1 配置路由
项目当中配置的路由一般放置在 router 文件夹中

5.2 总结
路由组件与非路由组件的区别？
1：路由组件一般放置在 pages|views 文件夹中，非路由组件一般放置在 compoments 文件夹中
2：路由组件一般需要在 router 文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候一般都是以标签的形式使用
3：注册完路由，不管是路由组件、还是非路由组件，身上都有$route和$router

$route:一般获取路由信息【路径、query、param 等等】
$router：一般进行编程时导航进行路由跳转【push|replace】

5.3 路由的跳转？
路由的跳转有两种形式：
声明式导航 router-link,可以进行路由的跳转
编程式导航 push|replace，可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航都能做，
但是编程式除了可以进行路由跳转，还可以做一些其他的业务逻辑

6)Footer 组件显示与隐藏
显示或者隐藏组件：v-if|v-show

Footer 组件：在 Home、Search 显示 Footer 组件
Footer 组件：在登录、注册时候隐藏的

6.1 我们可以根据组件身上的$route 获取当前路由的信息，通过路由路径判断 Footer 显示与隐藏
6.2p 配置路由的时候，可以给路由添加元信息【meta】，路由需要配置对象，它的 key 不能随便写

7)路由传参
7.1:路由的跳转有几种方式
比如：A->B
声明式导航：router-link（务必要有 to 属性）
编程式导航：利用的是组件势力的$router.push|replace 方法

7.2 路由传参，参数有几种写法？
params 参数：属于路径当中的一部分，需要注意，在配置路由的时候需要占位
query 参数：不属于路径中的一部分，类似于 ajax 中的 queryString /home?k=v&kv=,不需要占位

8)路由传参相关面试题
1：路由传递参数（对象写法）path 是否可以结合 params 参数一起使用?
2: 如何指定 params 参数可传可不传
比如：配置路由的时候，占位了（params 参数），但是路由跳转的时候就不传递。路径就会出现问题
3：params 参数可以传也可以不传，但如果传递是空串，如何解决？
4：路由组件能不能传递 props 数据

5.//路由传参：
//第一种：字符串形式
// this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      //第二种：模板字符串
      // this.$router.push(
// `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
// );
//第三种：对象 最常用
// this.$router.push({
// name: "search",
// params: { keyword: this.keyword },
// query: { k: this.keyword.toUpperCase() },
// });

      // ---------------------------------------------------------------------------
      // 1：路由传递参数（对象写法）path 是否可以结合 params 参数一起使用?
      // 答：路由跳转传参的时候，对象的写法可以是name，path形式，path这种写法不能与params参数一起使用
      // this.$router.push({ path: "search", params: { keyword: this.keyword } });

//2: 如何指定 params 参数可传可不传
//如果路由要求传递 params 参数，但是你不传递 params 参数，会发现 URL 出现问题
// //如何指定 params 参数可传可不传参数，在配置路由的时候，在占位的后面加上一个问号【代表可传可不传】
// this.$router.push({
      //   name: "search",
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // 3：params 参数可以传也可以不传，但如果传递是空串，如何解决？
      //同样出现路径问题  使用undefined解决：params参数可以传递、不传递（空的字符串）
      // this.$router.push({
// name: "search",
// params: { keyword: "" || undefined },
// query: { k: this.keyword.toUpperCase() },
// });
// 4：路由组件能不能传递 props 数据?
// //答：可以的三种写法
