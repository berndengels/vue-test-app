<template>
    <li>
        <form @submit.prevent>
            <input name="done" type="checkbox" v-model="todo.done"
                   @change="$emit('update-todo', todo)">
            <input name="title" type="text" :class="{'done': todo.done}"
                   v-model.lazy="todo.title"
                   @click="$emit('select-todo', todo)"
                   @change="$emit('update-todo', todo)"
            />
            <b-button
                    @click="$emit('delete-todo', todo)"
                    class="btn-sm btn-danger float-right del"
            >
                löschen
            </b-button>
        </form>
        <div v-if="todo.errors && todo.errors.title && todo.errors.title.length > 0" class="alert-danger px-2 py-0 m-1 justify-content-center">
            <span>{{ todo.errors.title[0] }}</span>
        </div>
    </li>
</template>

<script>
	export default {
		name: "Todo",
		props: ['todo'],
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
