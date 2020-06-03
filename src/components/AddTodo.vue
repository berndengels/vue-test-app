<template>
    <form @submit.prevent>
        <input
                name="title"
                type="text"
                v-model="title"
        >
        <b-button
                @click="$emit('add-todo', title)"
                class="btn-sm btn-info ml-2"
        >
            Add Todo
        </b-button>
        <div v-if="error" class="alert-danger p-2 m-2 justify-content-center">
            <span>{{ error }}</span>
        </div>
    </form>
</template>

<script>
	export default {
		name: "AddTodo",
        props: ['error'],
		data() {
			return {
				title: null,
			}
		}
	}
</script>

<style scoped>

</style>
