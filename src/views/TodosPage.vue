<template>
    <div class="home">
        <!--img alt="Vue logo" src="../assets/logo.png"-->
        <Todos title="Todos"/>
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
