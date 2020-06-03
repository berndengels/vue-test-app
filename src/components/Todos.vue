<template>
    <div>
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo @add-todo="apiStore" />
        <div class="justify-content-center">
            <pulse-loader  v-if="loader.loading" class="mt-4" :loading="loader.loading" />
            <ul v-else>
                <!-- Todo Komponente  -->
                <Todo
                        v-for="todo in todos"
                        :key="todo.id"
                        :todo="todo"
                        @delete-todo="apiDestroy"
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
		            	this.addTodo(response.data.result)
			            this.loader.loading = false
		            })
		            .catch(err => console.error(err))
            },
			apiUpdate(todo) {
			},
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
