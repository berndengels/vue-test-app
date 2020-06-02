<template>
  <form @submit.prevent="false">
    <input
      type="text"
      name="title"
      v-model="title"
    >
    <b-button
      @click="$emit('add-todo', title)"
      class="btn-sm btn-info ml-2"
    >
      Add Todo
    </b-button>
  </form>
</template>

<script>
	export default {
		name: "AddTodo",
        data() {
			return {
				title: null,
            }
        }
	}
</script>

<style scoped>

</style>
