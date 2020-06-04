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
		},
		storeErrors: null,
		updateErrors: [],
		loading: false,
	},
	getters: {
		allTodos: (state => state.todos),
		selectedTodo: (state => state.todo),
		storeErrors: (state => state.storeErrors),
		updateErrors: (state => id => state.updateErrors[id] ?? null),
		loading: (state => state.loading),
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
			commit('setLoading', true)
			axios.post(apiURL, todo)
				.then(response => {
					if( response.data.success && response.data.result && !response.data.errors ) {
						commit('clearStoreErrors')
						commit('newTodo', response.data.result)
						commit('selectedTodo', todo)
					} else {
						commit('setStoreErrors', response.data.errors)
					}
					commit('setLoading', false)
				})
				.catch(err => console.error(err))
		},
		apiUpdate({commit}, todo) {
			commit('setLoading', true)
			axios.put(apiURL + "/" + todo.id, todo)
				.then(response => {
					if( response.data.success && response.data.result && !response.data.errors ) {
						commit('clearUpdateErrors')
						commit('updatedTodo', todo)
						commit('selectedTodo', todo)
					} else {
						const errors = response.data.errors
						commit('setUpdateErrors', { todo, errors } )
					}
					commit('setLoading', false)
				})
				.catch(err => console.error(err))
		},
		apiDestroy({commit}, todo) {
			if (!confirm('Daten wirklich löschen?')) {
				return
			}
			commit('setLoading', true)
			axios.delete(apiURL + "/" + todo.id)
				.then(() => {
					commit('removedTodo', todo)
					commit('setLoading', false)
				})
				.catch(err => console.error(err))
		},
		selectTodo({commit}, todo) {
			commit('selectedTodo', todo)
		},
	},
	mutations: {
		setTodos: (state, todos) => (state.todos = todos),
		newTodo: (state, todo) => state.todos.push(todo),
		selectedTodo: (state, todo) => state.todo = todo,
		updatedTodo: (state, todo) => state.todos = state.todos.filter(t => t === todo ? todo : t),
		removedTodo: (state, todo) => state.todos = state.todos.filter(t => t !== todo),
		clearStoreErrors: (state) => (state.storeErrors = null),
		clearUpdateErrors: (state) => (state.updateErrors = []),
		setStoreErrors: (state, errors) => (state.storeErrors = errors),
		setUpdateErrors: (state, { todo, errors }) => (state.updateErrors = {[todo.id]: errors}),
		setLoading: (state, loading) => (state.loading = loading),
	},
	modules: {}
})
