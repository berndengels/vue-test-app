<template>
    <Modal v-if="modal" ref="todoInfo">
        <template v-slot:header>
            <h1>Selected Todo</h1>
        </template>

        <template v-slot:body>
            <table class="table table-striped" v-if="selectedTodo">
                <tr><th class="col-2">ID</th><td class="col-auto">{{ selectedTodo.id }}</td></tr>
                <tr><th class="col-2">Titel</th><td class="col-auto">{{ selectedTodo.text }}</td></tr>
                <tr><th class="col-2">erledigt</th><td class="col-auto">{{ selectedTodo.done ? 'Ja' : 'Nein' }}</td></tr>
            </table>
        </template>

        <template v-slot:footer>
            <div>
                <button class="btn-sm btn-primary" @click="$refs.todoInfo.closeModal()">Schließen</button>
            </div>
        </template>
    </Modal>

    <div v-else class="container mt-4">
        <h3>Todo Info</h3>
        <table class="table table-striped" v-if="selectedTodo">
            <tr><th class="col-2">ID</th><td class="col-auto">{{ selectedTodo.id }}</td></tr>
            <tr><th class="col-2">Titel</th><td class="col-auto">{{ selectedTodo.text }}</td></tr>
            <tr><th class="col-2">erledigt</th><td class="col-auto">{{ selectedTodo.done ? 'Ja' : 'Nein' }}</td></tr>
        </table>
        <p v-else>
            no selected Todo
        </p>
    </div>
</template>

<script>
    import Modal from './layouts/Modal'
    import { mapGetters } from 'vuex'
    import store from "../store";

	export default {
		name: "TodoInfo",
    props: {
			modal: {
				type: Boolean,
                require: false,
                default: false,
            },
        },
        components: { Modal },
        computed: mapGetters({selectedTodo: 'todos/selectedTodo'}),
		created() {
			if(true === this.modal) {
				this.unwatch = store.watch(
					(state, getters) => getters['todos/selectedTodo'],
					(newValue) => newValue ? this.$refs.todoInfo.openModal() : false
				).bind(this);
      }
		},
	}
</script>

<style scoped>

</style>
