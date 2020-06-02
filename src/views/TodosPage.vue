<template>
    <div class="container">
        <!--img alt="Vue logo" src="../assets/logo.png"-->
        <Todos header-title="Meine Todos"/>
    </div>
</template>

<script>
	// @ is an alias to /src
	import Todos from '@/components/Todos'

	export default {
		name: 'TodosPage',
		components: { Todos }
	}
</script>
