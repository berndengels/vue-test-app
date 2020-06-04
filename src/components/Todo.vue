<template>
    <li>
        <form @submit.prevent>
            <input @change="onChange(todo)" name="done" type="checkbox"
                   v-model="todo.done">
            <input :class="{'done': todo.done}"
                   @change="onChange(todo)"
                   @click="onSelect(todo)"
                   name="title"
                   type="text"
                   v-model="todo.title"
            />
            <b-button
                    @click="handleDelete(todo)"
                    class="btn-sm btn-danger float-right del"
            >
                löschen
            </b-button>
        </form>
        <div v-if="updateErrors && updateErrors.title" class="alert-danger px-2 py-0 m-1 justify-content-center">
            <span>{{ updateErrors.title[0] }}</span>
        </div>
    </li>
</template>

<script>
	import { mapActions } from 'vuex';
	import store from '../store'

	export default {
		name: "Todo",
		props: ['todo'],
		methods: {
			...mapActions(['selectTodo', 'apiUpdate', 'apiDestroy']),
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
				return store.getters.updateErrors(this.todo.id)
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
</style>
