import ls from '../../utils/localStorage'
import router from '../../router'

const state = {
	auth: ls.getItem('auth')
}

const mutations = {
  SET_AUTH (state, value) {
    state.auth = value 
    ls.setItem('auth', value)
  },
}

const actions = {
	logout ({commit}){
		commit('SET_AUTH', '')
		router.push('/login')
	}
}

export default {
  state,
	actions,
  mutations
}