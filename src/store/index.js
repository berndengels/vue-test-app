import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiURL = 'http://videostore.loc/api/todo';

export default new Vuex.Store({
	state: {
		todos: [],
	},
	getters: {
		allTodos: (state => state.todos),
	},
	actions: {
		apiIndex({commit}) {
			axios.get(apiURL)
				.then(response => {
					console.info(response.data)
					commit('setTodos', response.data)
				})
				.catch(err => console.error(err))
		},
		apiStore({commit}, todo) {
			axios.post(apiURL, todo)
				.then(response => {
					commit('newTodo', response.data.result)
				})
				.catch(err => console.error(err))
		},
	},
	mutations: {
		setTodos: (state, todos) => (state.todos = todos),
		newTodo: (state, todo) => state.todos.unshift(todo),
	},
	modules: {}
})
