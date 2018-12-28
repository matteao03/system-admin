import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/element.js'
import './assets/css/common.scss'
import store from './store'
import Mock from './mock/index'
import router from './router'
Mock.init()

Vue.config.productionTip = false

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app')
