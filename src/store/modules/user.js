import Axios from 'axios'

const apiURL = "http://videostore.loc",
	_axios = Axios.create({
		baseURL: apiURL,
//		withCredentials: true,
	});

const axios = _axios

export default {
	namespaced: true,
	state: {
		user: null,
	},
	getters: {
		myUser: (state => state.user ?? null),
	},
	actions: {
		login({commit}, user) {
			axios.post('/api/login', user)
				.then(resp => {
					localStorage.setItem('user.name', resp.data.name);
					localStorage.setItem('user.token', resp.data.token);
					const user = {
						name:  resp.data.name,
						token: resp.data.token,
					}
					commit('setUser', user)
				})
				.catch(err => console.error(err));
		},
		logout({commit}) {
			localStorage.clear()
			commit('removeUser')
		},
	},
	mutations: {
		setUser: (state, user) => state.user = user,
		removeUser: (state) => state.user = null,
	},
}
