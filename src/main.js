import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import Axios from "axios";

const apiURL = "http://videostore.loc",
	userToken = localStorage.getItem('user.token'),
	userName = localStorage.getItem('user.name'),
	_axios = Axios.create({
		baseURL: apiURL,
		withCredentials: true,
	});
if(userToken) {
	_axios.defaults.headers.common['Authorization'] = "Bearer " + userToken
}
Vue.prototype.$axios = _axios
Vue.prototype.$authToken = userToken
Vue.prototype.$userName = userName
window.$axios = _axios
window.$authToken = userToken
window.$userName = userName

Vue.config.productionTip = false

import store from './store'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
