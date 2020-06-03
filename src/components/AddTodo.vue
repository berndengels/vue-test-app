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
        <div v-if="errors && errors.title && errors.title.length > 0 " class="alert-danger p-2 m-2 justify-content-center">
            <span>{{ errors.title[0] }}</span>
        </div>
    </form>
</template>

<script>
	export default {
		name: "AddTodo",
        props: ['errors'],
		data() {
			return {
				title: null,
			}
		},
        methods: {
			add() {
				this.$emit('add-todo', this.title)
                this.title = null
            }
        }
	}
</script>

<style scoped>

</style>
