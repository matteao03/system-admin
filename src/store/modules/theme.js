import ls from '../../utils/localStorage'

const state = {
	theme: ls.getItem('theme') || "#409EFF"
}

const getters = {
  theme: state => state.theme,
}

const mutations = {
  SET_THEME (state, color) {
    state.theme = color 
    ls.setItem('theme', color)
  },
}

export default {
  state,
  getters,
  mutations
}