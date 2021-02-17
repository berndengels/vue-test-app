import Axios from 'axios'

const apiURL = "http://videostore.loc/api/todos",
	authToken = localStorage.getItem('user.token'),
	_axios = Axios.create({
		baseURL: apiURL,
		withCredentials: true,
	});

console.info(authToken);

if(authToken) {
	_axios.defaults.headers.common['Authorization'] = "Bearer " + authToken
}
const axios = _axios

const handleErrors = (err) => {
	if (err.response) {
		let resp = err.response
		switch (resp.status) {
			// unauthenticated
			case 401:
				alert(err.response.data.message)
				location.href="/#/login";
				break;
			default:
				alert(err.response.data.message)
				break;
		}
	}
	console.error(err)
}
export default {
	namespaced: true,
	state: {
		todos: [],
		todo: null,
		storeErrors: null,
		updateErrors: [],
		loading: false,
		user: null,
	},
	getters: {
		allTodos: (state => state.todos),
		selectedTodo: (state => state.todo),
		storeErrors: (state => state.storeErrors),
		updateErrors: (state => id => state.updateErrors[id] ?? null),
		isLoading: (state => state.loading),
		user: (state => state.user),
	},
	actions: {
		apiIndex({commit}) {
			commit('setLoading', true)
			axios.get()
				.then(response => {
					if (response.data.data && !response.data.error) {
						commit('setTodos', response.data.data)
						commit('setLoading', false)
					} else {
						commit('setStoreErrors', response.data.error)
					}
				})
				.catch(err => console.error(err))
		},
		apiStore({commit}, todo) {
			axios.post(apiURL, todo)
				.then(response => {
					if (response.data.data && !response.data.error) {
						commit('clearStoreErrors')
						commit('newTodo', response.data.data)
						commit('selectedTodo', todo)
					} else {
						commit('setStoreErrors', response.data.error)
					}
				})
				.catch(err => handleErrors(err))
		},
		apiUpdate({commit}, todo) {
			const config = {
				headers: { Authorization: `Bearer ${localStorage.getItem('user.token')}` }
			};
			axios.put(apiURL + "/" + todo.id, todo, config)
				.then(response => {
					if (response.data.data && !response.data.error) {
						commit('clearUpdateErrors')
						commit('updatedTodo', todo)
						commit('selectedTodo', todo)
					} else {
						const errors = response.data.error
						commit('setUpdateErrors', {todo, errors})
					}
				})
				.catch(err => handleErrors(err))
		},
		apiDestroy({commit}, todo) {
			if (!confirm('Daten wirklich löschen?')) {
				return
			}
			axios.delete(apiURL + "/" + todo.id)
				.then(() => {
					commit('removedTodo', todo)
					commit('selectedTodo', {})
				})
				.catch(err => handleErrors(err))
		},
		selectTodo({commit}, todo) {
			commit('selectedTodo', todo)
		},
		login({commit}, user) {
			localStorage.setItem('user.name', user.name);
			localStorage.setItem('user.token', user.token);
			commit('setUser', user)
		},
		logout({commit}) {
			localStorage.clear()
			commit('removeUser')
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
		setUpdateErrors: (state, {todo, errors}) => (state.updateErrors = {[todo.id]: errors}),
		setLoading: (state, loading) => (state.loading = loading),
		setUser: (state, user) => state.user = user,
		removeUser: (state) => state.user = null,
	},
}
