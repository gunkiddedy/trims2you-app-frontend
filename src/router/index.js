import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const route = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	// {
	//   path: '/home/:id',
	//   name: 'Home',
	//   component: () => import('../views/Home.vue'),
	//   props: true
	// },
]

const router = new VueRouter({
	// routes
	mode: 'history',
  	routes: route
})

export default router
