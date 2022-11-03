import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
//home模块的小仓库
const state = {
  //服务器返回啥，起始值就是啥，对象，数组，根据接口返回值初始化
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor数据
  floorList: [],
};
const actions = {
  //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图banner图的action
  async getBannerList({ commit }) {
    //获取首页数据
    let result = await reqGetBannerList();
    if (result.code == 200) {
      // console.log('actions发请求')
      commit("GETBANNERLIST", result.data);
    }
  },
  //获取floor的action
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      //提交mutation
      commit("GETFLOORLIST", result.data);
    }
  },
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
    // console.log('mutation修改数据')
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
