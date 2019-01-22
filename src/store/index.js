import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
console.log(mutations);
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        userName:""
    },
    mutations
})