<template>
  <div class="container">
    <Todos header-title="Meine Todos Page" />
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
