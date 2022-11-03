import { reqGetGoodInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid   ---生成一个随机字符串（不能再变）
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodIndo: {},
  //游客临时身份
  uuid_token: getUUID(),
};
const actions = {
  //获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGetGoodInfo(skuId);
    if (result.code == 200) {
      commit("GETGOOINFO", result.data);
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车返回的结果
    //加入购物车后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他数据，
    //因为没有返回数据，所以不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  GETGOOINFO(state, goodIndo) {
    state.goodIndo = goodIndo;
  },
};
//简化数据
const getters = {
  categoryView(state) {
    //比如：state.goodIndo初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的categoryView属性值至少是个空对象，假的报错就不会有了
    //路径导航简化数据
    return state.goodIndo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodIndo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodIndo.spuSaleAttrList || {};
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
