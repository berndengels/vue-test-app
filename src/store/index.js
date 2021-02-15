import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'

Vue.use(Vuex)
const store = new Vuex.Store()

// register a nested module `nested/myModule`
store.registerModule(['todos'], todos)
export default store
