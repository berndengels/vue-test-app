import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import user from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store()

// register a nested module `nested/myModule`
store.registerModule(['todos'], todos)
store.registerModule(['user'], user)

export default store
