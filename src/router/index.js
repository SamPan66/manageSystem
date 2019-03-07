import Vue from 'vue';
import Router from 'vue-router';
const mainRouter = [
    { path: '/', component: () => import('../components/HelloWorld.vue') },
    { path: '/hello', component: () => import('../components/HelloWorld.vue') },
    { path: '/OilStationCompany', component: () => import('../components/OilStationCompany.vue') },
    {
        path: '/UserSettings', component: () => import('../components/UserSettings.vue'), children: [{
            path: '/UserSettings/emails',
            component:  () => import('../components/userSettings/UserEmailsSubscriptions.vue')
        }, {
            path: '/UserSettings/profile',
            components: {
                default:  () => import('../components/userSettings/UserProfile.vue'),
                helper:  () => import('../components/userSettings/UserProfilePreview.vue')
            }
        }]
    }
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