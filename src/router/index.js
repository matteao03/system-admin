import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
 // mode:'history',
  routes
})

//前置导航守卫
router.beforeEach((to, from, next) => {
	const app = router.app
	const store = app.$options.store
	const auth = store.state.auth.auth

	if (!auth && to.path !== '/login'){
		next('/login')
	} else if (auth && to.path === '/login'){
		next(from.path);
	} else {
		next()
	}
})

export default router
