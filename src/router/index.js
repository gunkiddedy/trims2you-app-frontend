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
		path: '/products',
		name: 'Products',
		component: () => import('../components/reseller/Products.vue')
	},
	{
		path: '/customer-service',
		name: 'CustomerService',
		component: () => import('../components/reseller/CustomerService.vue')
	},
	{
		path: '/reseller-bank',
		name: 'ResellerBank',
		component: () => import('../components/reseller/ResellerBank.vue')
	},
	{
		path: '/deposite',
		name: 'Deposite',
		component: () => import('../components/reseller/Deposite.vue')
	},
	{
		path: '/incoming-product-name/:name',
		name: 'IncomingProductName',
		component: () => import('../components/warehouse/IncomingProductName.vue'),
		props: true
	},
	{
		path: '/incoming-product-name-detail/:id',
		name: 'IncomingProductNameDetail',
		component: () => import('../components/warehouse/IncomingProductNameDetail.vue'),
		props: true
	},
	{
		path: '/outgoing-product-detail/:id',
		name: 'OutgoingProductDetail',
		component: () => import('../components/warehouse/OutgoingProductDetail.vue'),
		props: true
	},
	{
		path: '/order-detail/:id',
		name: 'OrderDetail',
		component: () => import('../components/reseller/OrderDetail.vue'),
		props: true
	},
]

const router = new VueRouter({
	// routes
	mode: 'history',
  	routes: route
})

export default router
