<template>
    <div class="container mt-4">
        <h3>Todo Info</h3>
        <table
                class="table table-striped"
                v-if="todo"
        >
            <tr>
                <th class="col-2">
                    ID
                </th>
                <td class="col-auto">
                    {{ todo.id }}
                </td>
            </tr>
            <tr>
                <th class="col-2">
                    Titel
                </th>
                <td class="col-auto">
                    {{ todo.title }}
                </td>
            </tr>
            <tr>
                <th class="col-2">
                    erledigt
                </th>
                <td class="col-auto">
                    {{ todo.done }}
                </td>
            </tr>
        </table>
        <p v-else>
            no selected Todo
        </p>
    </div>
</template>

<script>
	export default {
		name: "TodoInfo",
		props: {
			todo: {
				type: Object,
				default: function () {
					return {
						id: null,
						title: null,
						done: false,
					}
				}
			}
		},
	}
</script>

<style scoped>

</style>
