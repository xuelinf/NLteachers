// 本文件由FirstUI授权予薛*风（会员ID： 3  811）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import App from './App'
import fui from './common/fui-app'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
Vue.prototype.fui = fui
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

uni.fui = fui;

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
import Vuex from 'vuex'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.fui = fui;
	return {
		app,
		Vuex
	}
}
// #endif