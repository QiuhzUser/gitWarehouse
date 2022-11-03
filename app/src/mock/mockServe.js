//先引入mockjs模块
import Mock from "mockjs";
//把JSON格式数据引入[JSON数据格式没有对外暴露，但是可以引入]
//webpack 默认对外暴露的：图片，JSON数据格式
import banner from "./banner.json";
import floor from "./floor.json";

// mock 数据:第一个参数时请求的地址   第二个参数：请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
