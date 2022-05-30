import { createStore } from "vuex";

import user from './modules/user'
import cart from './modules/cart'

export default createStore({
  // 添加 modules
  modules:{
    user,
    cart
  }
});
