import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiURL = 'http://videostore.loc/api/todo';

export default new Vuex.Store({
	state: {
		todos: [],
		todo: {
			id: 0,
			title: 'Standard Titel',
			done: false,
		}
	},
	getters: {
		allTodos: (state => state.todos),
		selectedTodo: (state => state.todo),
	},
	actions: {
		apiIndex({commit}) {
			axios.get(apiURL)
				.then(response => {
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
		apiUpdate({commit}, todo) {
			axios.put(apiURL + "/" + todo.id, todo)
				.then(response => {
					commit('updatedTodo', response.data.result)
				})
				.catch(err => console.error(err))
		},
		apiDestroy({commit}, todo) {
			if (!confirm('Daten wirklich löschen?')) {
				return
			}
			axios.delete(apiURL + "/" + todo.id)
				.then(() => {
					commit('removedTodo', todo)
				})
				.catch(err => console.error(err))
		},
		selectTodo({commit}, todo) {
			commit('selectedTodo', todo)
		},
	},
	mutations: {
		setTodos: (state, todos) => (state.todos = todos),
		newTodo: (state, todo) => state.todos.unshift(todo),
		selectedTodo: (state, todo) => state.todo = todo,
		updatedTodo: (state, todo) => state.todos = state.todos.filter(t => t === todo ? todo : t),
		removedTodo: (state, todo) => state.todos = state.todos.filter(t => t !== todo),
	},
	modules: {}
})
