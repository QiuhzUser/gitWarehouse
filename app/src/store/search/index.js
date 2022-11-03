import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state = {
  searchList: {},
};
const actions = {
  //获取search模块的数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchInfo这个函数在调用获取服务器数据的时候至少传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//计算属性
//项目当中getters主要的作用是：简化数据而生
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便】
const getters = {
  //当前形参state，是当前仓库的state
  goodsList(state) {
    //state.searchList.goodsList 如果服务器数据回来了，是一个数组
    //加入网络不给力|无网络state.searchList.goodsList应该返回的是undefined
    //计算新的属性值至少给一个数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
