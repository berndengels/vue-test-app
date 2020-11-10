<template>
    <form @submit.prevent>
        <input
                name="title"
                type="text"
                v-model="text"
                placeholder="Add Todo"
        >
        <b-button
                @click="add"
                class="btn-sm btn-info ml-2"
        >
          <font-awesome-icon icon="plus-square" />Add Todo
        </b-button>
        <div v-if="storeErrors && storeErrors.text " class="alert-danger p-2 m-2 justify-content-center">
            <span>{{ storeErrors.text[0] }}</span>
        </div>
    </form>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

	export default {
		name: "AddTodo",
		data() {
			return {
				text: null,
			}
		},
        methods: {
			...mapActions({apiStore: 'todos/apiStore'}),
			add() {
				const obj = {
					text: this.text,
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
svg[data-icon] {
  display: inline;
  margin-right: 5px;
}
</style>
