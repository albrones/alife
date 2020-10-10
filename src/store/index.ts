import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogged: false,
        user: {
            email: '',
            displayName: '',
            photoUrl: '',
        },
    },
    mutations: {
        saveUserInfo(state, user) {
            state.user = user
        },
        removeUserInfo(state) {
            state.user = {
                email: '',
                displayName: '',
                photoUrl: '',
            }
        },
        isLogged(state, value) {
            state.isLogged = value
        },
    },
    actions: {},
    modules: {},
})
