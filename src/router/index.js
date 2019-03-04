import Vue from 'vue';
import Router from 'vue-router';
const mainRouter = [
    { path: '/', component: () => import('../components/HelloWorld.vue') },
    { path: '/hello', component: () => import('../components/HelloWorld.vue') },
    { path: '/OilStationCompany', component: () => import('../components/OilStationCompany.vue') }
]
Vue.use(Router);
const newRouter = new Router({
    routes: mainRouter
})
newRouter.beforeEach((to, from, next) => {
    console.log(to, from, next)
    next()
})
export default newRouter 