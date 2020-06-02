<template>
    <div class="">
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo @add-todo="addTodo" />
        <div class="justify-content-center">
            <ul>
                <!-- Todo Komponente  -->
                <Todo v-for="todo in todos" :key="todo.id" :todo="todo" @delete-todo="deleteTodo" />
            </ul>
        </div>
    </div>
</template>

<script>
    import todoData from "../store/todos.json"
    import AddTodo from "./AddTodo";
    import Todo from "./Todo";

	export default {
		name: 'Todos',
        props: ['headerTitle'],
        components: { AddTodo, Todo },
		data() {
			return {
				todos: todoData,
			}
		},
		methods: {
			addTodo(title) {
				const newTodo  = {
					id: this.getLastId(),
                    title: title,
                    done: false
                }
                this.todos.push(newTodo)
            },
            deleteTodo(todo) {
				console.info(todo)
                this.todos = this.todos.filter(function(t) {
                    if(t !== todo) {
						return t;
                    }
                });
				// or ES6 arrow function
                // this.todos = this.todos.filter(t => t !== todo);
            },
            getLastId() {
				return this.todos.map(t => t.id).sort().pop() + 1
            }
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
