<template>
    <div>
        <h1>{{ headerTitle }}</h1>
        <!-- AddTodo Komponente  -->
        <AddTodo/>

        <div class="justify-content-center">
            <pulse-loader v-if="isLoading" :loading="isLoading" class="mt-4"/>
            <ul v-else>
                <!-- Todo Komponente  -->
                <Todo
                    v-for="todo in allTodos"
                    :key="todo.id"
                    :todo="todo"
                />
            </ul>

            <TodoInfo/>
            <!-- or open in modal window -->
            <!-- TodoInfo modal /-->
        </div>
    </div>
</template>

<script>/* eslint-disable */
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import TodoInfo from "./TodoInfo";
import Modal from "./layouts/Modal";
import {mapActions, mapGetters} from 'vuex'
import store from "../store";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import todos from "../store/modules/todos";

export default {
    name: 'Todos',
    props: ['headerTitle'],
    components: {Modal, AddTodo, Todo, TodoInfo, PulseLoader},
    data() {
        return {
            errors: null,
            loader: {
                loading: false,
                color: '#249724',
                size: '20px',
            },
        }
    },
    created() {
//        this.apiIndex()
        store.dispatch('todos/apiIndex')
    },
    computed: {
        ...mapGetters({
            allTodos: 'todos/allTodos',
            isLoading: 'todos/isLoading',
        }),
    },
    methods: {
        //...mapActions({apiIndex: 'todos/apiIndex'}),
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
