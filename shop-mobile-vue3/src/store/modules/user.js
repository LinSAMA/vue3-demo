const state = {
  token: window.localStorage.getItem("USER_TOKEN") || "",
};
const mutations = {
  setUser(state, payload) {
    // 设置 token
    state.token = payload;
    window.localStorage.setItem("USER_TOKEN", payload);
  },
};
const getters = {};
const actions = {};

export default {
  namespaced:true,
  state,
  mutations,
  getters,
  actions,
};
