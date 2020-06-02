<template>
    <li>
        <form @submit.prevent>
            <input name="done" type="checkbox" v-model="todo.done">
            <span :class="{done: todo.done}"
                    @click="$emit('select-todo', todo)"
            >{{ todo.title }}</span>
            <b-button
                    @click="$emit('delete-todo', todo)"
                    class="btn-sm btn-danger float-right"
            >
                löschen
            </b-button>
        </form>
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
</style>
