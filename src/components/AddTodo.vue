<template>
    <form @submit.prevent>
        <input
                name="title"
                type="text"
                v-model="title"
                placeholder="Add Todo"
        >
        <b-button
                @click="add"
                class="btn-sm btn-info ml-2"
        >
            Add Todo
        </b-button>
        <div v-if="storeErrors && storeErrors.title " class="alert-danger p-2 m-2 justify-content-center">
            <span>{{ storeErrors.title[0] }}</span>
        </div>
    </form>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

	export default {
		name: "AddTodo",
		data() {
			return {
				title: null,
			}
		},
        methods: {
			...mapActions({apiStore: 'todos/apiStore'}),
			add() {
				const obj = {
					title: this.title,
                    done: false,
                }
				this.apiStore(obj)
                this.title = null
            }
        },
		computed: mapGetters({storeErrors: 'todos/storeErrors'}),
	}
</script>

<style scoped>

</style>
