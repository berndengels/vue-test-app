<template>
    <li>
        <form @submit.prevent>
            <input v-model="todo.done" name="done"
                   type="checkbox"
                   @change="onChange(todo)"
            >
            <input v-model="todo.text" :class="{'done': todo.done}"
                   name="title"
                   type="text"
                   @change="onChange(todo)"
                   @click="onSelect(todo)"
            />
            <b-button
                class="btn-sm btn-danger float-right del"
                @click="handleDelete(todo)"
            >
                <font-awesome-icon icon="trash-alt"/>
                löschen
            </b-button>
        </form>
        <div v-if="updateErrors && updateErrors.text" class="alert-danger px-2 py-0 m-1 justify-content-center">
            <span>{{ updateErrors.text[0] }}</span>
        </div>
    </li>
</template>

<script>
import {mapActions} from 'vuex';
import store from '../store'

export default {
    name: "Todo",
    props: ['todo'],
    methods: {
        ...mapActions({
            selectTodo: 'todos/selectTodo',
            apiUpdate: 'todos/apiUpdate',
            apiDestroy: 'todos/apiDestroy',
        }),
        onSelect(todo) {
            this.selectTodo(todo)
        },
        onChange(todo) {
            this.apiUpdate(todo)
        },
        handleDelete(todo) {
            this.apiDestroy(todo)
        },
    },
    computed: {
        updateErrors() {
            return store.getters['todos/updateErrors'](this.todo.id)
        }
    },
}
</script>

<style scoped>
.done {
    text-decoration: line-through;
}

form {
    display: flex;
    width: 100%;
}

input[type="checkbox"] {
    flex: 0.5;
}

input[type="text"] {
    flex: 10;
    height: 1.8rem;
    border: none;
}

button {
    flex: 1;
}

li {
    list-style: none;
    height: auto;
    min-height: 2.0rem;
    line-height: 2.0rem;
    margin: 5px 10px 0 10px;
    border: 1px solid #42b983;
    border-radius: 5px;
    text-align: left;
}

svg[data-icon] {
    display: inline;
    margin-right: 5px;
}
</style>
