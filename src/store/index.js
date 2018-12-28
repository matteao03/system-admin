import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import theme from './modules/theme'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		theme,
		auth,
	},
})

export default store