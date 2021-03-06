import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '../firebaseConfig.js';
// import store from '../store'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
		meta: { guest: true } 
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta: { guest: true } 
	},
	{
		path: '/reset-password',
		name: 'ResetPassword',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/components/auth/ResetPassword.vue'),
		meta: { guest: true } 
	},
	{
		path: '/terms',
		name: 'Terms',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Terms.vue'),
		meta: { guest: true } 
	},
	{
		path: '/privacy',
		name: 'Privacy',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Privacy.vue'),
		meta: { guest: true } 
	},
	{
		path: '/blog',
		name: 'Blog',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue'),
		meta: { guest: true } 
	},
	{
		path: '/account',
		name: 'Account',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue'),
		meta: { guest: true } 
	},
	{
		path: '/projects',
		name: 'Projects',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
		meta: { guest: true },
	},
	{
		path: '/forum',
		name: 'Forum',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/components/user/Forum.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/groups',
		name: 'Groups',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/components/user/Groups.vue'),
		meta: { guest: true } 
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/components/user/Dashboard.vue'),
		meta: { requiresAuth: true },
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  
	if (requiresAuth && !firebase.auth().currentUser) {
		next({
			name: "Account",
			query: { redirect: to.fullPath },
		})		
	} else {
		next()
	}
})

export default router
