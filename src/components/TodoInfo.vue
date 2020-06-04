<template>
    <div class="container mt-4">
        <h3>Todo Info</h3>
        <table
                class="table table-striped"
                v-if="selectedTodo"
        >
            <tr>
                <th class="col-2">
                    ID
                </th>
                <td class="col-auto">
                    {{ selectedTodo.id }}
                </td>
            </tr>
            <tr>
                <th class="col-2">
                    Titel
                </th>
                <td class="col-auto">
                    {{ selectedTodo.title }}
                </td>
            </tr>
            <tr>
                <th class="col-2">
                    erledigt
                </th>
                <td class="col-auto">
                    {{ selectedTodo.done }}
                </td>
            </tr>
        </table>
        <p v-else>
            no selected Todo
        </p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

	export default {
		name: "TodoInfo",
        computed: mapGetters(['selectedTodo']),
	}
</script>

<style scoped>

</style>
