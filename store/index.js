// 本文件由FirstUI授权予薛*风（会员ID：3  8 11）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import {
	createStore
} from 'vuex'
const store = createStore({
// #endif
	state: {
		areaCode: '+86'
	},
	mutations: {
		setAreaCode(state, areaCode) {
			state.areaCode = areaCode || '+86'
		}
	},
	actions: {

	}
})

export default store