<template>
    <div class="hello">
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo @add-todo="addTodo" />
        <ul>
            <!-- Todo Komponente  -->
            <li v-for="todo in todos" :key="todo.id">
                <form @submit.prevent="false">
                    <input type="checkbox" name="done" v-model="todo.done">
                    <span :class="{done: todo.done}">{{ todo.title }}</span>
                    <b-button @click="deleteTodo(todo)" class="btn-sm btn-danger float-right">löschen</b-button>
                </form>
            </li>
        </ul>
    </div>
</template>

<script>
    import todoData from "../store/todos.json"
    import AddTodo from "./AddTodo";

	export default {
		name: 'Todos',
        props: ['headerTitle'],
        components: { AddTodo },
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
    .done {
        text-decoration: line-through;
    }
    ul {
        width: 80%;
        list-style: none;
        list-style-type: none;
        padding: 0;
    }
    li {
        list-style: none;
        height: 2.0rem;
        line-height: 2.0rem;
        margin: 5px 10px 0 10px;
        border: 1px solid #42b983;
        border-radius: 5px;
        text-align: left;
    }
    li input[type="checkbox"] {
        margin-left: 10px;
    }
    li span {
        margin-left: 10px;
    }
    a {
        color: #42b983;
    }
</style>
