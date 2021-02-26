import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const route = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		// props: true
	},
	{
		path: '/incoming-product-name/:name',
		name: 'IncomingProductName',
		component: () => import('../components/warehouse/IncomingProductName.vue'),
		props: true
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
