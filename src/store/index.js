import Vue from 'vue'
import Vuex from 'vuex'

import currentUser from './modules/currentUser'
import searchData from './modules/searchData'
import warehouseData from './modules/warehouseData'

Vue.use(Vuex)

export default new Vuex.Store({

	modules: {
    warehouseData,
    currentUser,
    searchData
  }

})
