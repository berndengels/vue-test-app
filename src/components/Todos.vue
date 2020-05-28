<template>
    <div class="hello">
        <h1>{{ title }}</h1>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <input type="checkbox" name="done" class="">
                <span>{{ todo.title }}</span>
                <b-button class="btn-sm btn-danger float-right">löschen</b-button>
            </li>
        </ul>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import todoData from "../store/todos.json"

	export default {
		name: 'Todos',
		props: ['title'],
		data() {
			return {
				todos: todoData,
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .done {

    }
    ul {
        list-style: none;
        list-style-type: none;
        padding: 0;
    }
    li {
        list-style: none;
        height: 2.0rem;
        margin: 0 10px;
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
