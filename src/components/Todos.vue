<template>
    <div>
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo @add-todo="apiStore" :errors="errors" />
        <div class="justify-content-center">
            <pulse-loader  v-if="loader.loading" class="mt-4" :loading="loader.loading" />
            <ul v-else>
                <!-- Todo Komponente  -->
                <Todo
                        v-for="todo in todos"
                        :key="todo.id"
                        :todo="todo"
                        @delete-todo="apiDestroy"
                        @update-todo="apiUpdate"
                        @select-todo="selectTodo"
                />
            </ul>
            <TodoInfo :todo="selectedTodo"/>
        </div>
    </div>
</template>

<script>/* eslint-disable */
	import AddTodo from "./AddTodo";
	import Todo from "./Todo";
	import TodoInfo from "./TodoInfo";
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const apiURL = 'http://videostore.loc/api/todo'

	export default {
		name: 'Todos',
		props: ['headerTitle'],
		components: { TodoInfo, AddTodo, Todo, PulseLoader },
		data() {
			return {
				todos: [],
                errors: null,
				selectedTodo: {
					id: 0,
					title: 'nix ausgewählt',
					done: false,
				},
				loader: {
					loading: false,
					color: '#249724',
					size: '20px',
				},
			}
		},
		created() {
			this.apiIndex()
		},
		methods: {
			// vue api requests
            apiIndex() {
            	this.loader.loading = true
				axios.get(apiURL)
					.then(response => {
						this.todos = response.data
						this.loader.loading = false
					})
					.catch(err => console.error(err))
			},
            apiDestroy(todo) {
	            if (!confirm('Daten wirklich löschen?')) {
	            	return
                }

	            this.loader.loading = true
	            axios.delete(apiURL + "/" + todo.id)
		            .then(response => {
			            this.deleteTodo(todo)
			            this.loader.loading = false
		            })
		            .catch(err => console.error(err))
            },
            apiStore(title) {
	            const params = {
		            title: title,
		            done: false
	            }
	            this.loader.loading = true
	            axios.post(apiURL, params)
		            .then(response => {
		            	if(response.data.success && !response.data.errors) {
				            this.errors = null
				            this.addTodo(response.data.result)
                        } else {
                            this.errors = response.data.errors
                        }
			            this.loader.loading = false
		            })
		            .catch(err => console.error(err))
            },
			apiUpdate(todo) {
				this.loader.loading = true
				axios.put(apiURL + "/" + todo.id, todo)
					.then(response => {
						let validationSuccess = response.data.success && !response.data.errors
						this.todos = this.todos.filter(t => {
							if(t === todo) {
								t.errors = validationSuccess ? null : response.data.errors
							}
							return t;
						})
						this.loader.loading = false
					})
					.catch(err => console.error(err))
			},

            // vue intern js actions
			selectTodo(todo) {
				this.selectedTodo = todo
			},
			addTodo(todo) {
				this.todos.push(todo)
			},
			deleteTodo(todo) {
				// or ES6 arrow function
				this.todos = this.todos.filter(t => t !== todo);
			},
		}
	}
</script>

<style scoped>
    ul {
        list-style: none;
        list-style-type: none;
        padding: 0;
    }
</style>
