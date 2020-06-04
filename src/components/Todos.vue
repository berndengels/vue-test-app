<template>
    <div>
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo />

        <div class="justify-content-center">
            <pulse-loader  v-if="isLoading" class="mt-4" :loading="isLoading" />
            <ul v-else>
                <!-- Todo Komponente  -->
                <Todo
                        v-for="todo in allTodos"
                        :key="todo.id"
                        :todo="todo"
                />
            </ul>
            <TodoInfo />
        </div>
    </div>
</template>

<script>/* eslint-disable */
	import AddTodo from "./AddTodo";
	import Todo from "./Todo";
	import TodoInfo from "./TodoInfo";
	import { mapActions, mapGetters } from 'vuex'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

	export default {
		name: 'Todos',
		props: ['headerTitle'],
		components: { TodoInfo, AddTodo, Todo, PulseLoader },
		data() {
			return {
				todos: [],
                errors: null,
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
        computed: mapGetters(['allTodos','isLoading']),
		methods: {
			...mapActions(['apiIndex']),
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
