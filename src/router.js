import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import login from './views/login.vue'
import base from './routers/base.js'
import test from './routers/test.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	{
		path: '/',
		name: 'login',
		component: login
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		children:[
			...base,
			...test
		]
	}

  ]
})
