import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedbyid } from "@/api";
const state = {
  cartList: [],
};
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqGetCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车数据
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某个产品选中状态
  async updetaCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedbyid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context小仓库  commit【提交mutation修改state】  getters【计算属性】 dispatch【派发action】state【仓库当前数据】
    //获取购物车全部产品一个数组
    let PromiseAll = [];
    getters.cartlist.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      //每一次返回的promis返回到数组当中
      PromiseAll.push(promise);
    });
    //只要p1||p2...都成功，返回结果都成功
    //y一个失败，则返回失败结果
    return Promise.all(PromiseAll);
  },
  //修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updetaCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  cartlist() {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
