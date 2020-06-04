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
        <!--div v-if="errors && errors.title && errors.title.length > 0 " class="alert-danger p-2 m-2 justify-content-center">
            <span>{{ errors.title[0] }}</span>
        </div-->
    </form>
</template>

<script>
    import { mapActions } from 'vuex'

	export default {
		name: "AddTodo",
		data() {
			return {
				title: null,
			}
		},
        methods: {
			...mapActions(['apiStore']),
			add() {
				const obj = {
					title: this.title,
                    done: false,
                }
				this.apiStore(obj)
                this.title = null
            }
        }
	}
</script>

<style scoped>

</style>
