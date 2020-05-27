<template>
    <div class="home">
        <!--img alt="Vue logo" src="../assets/logo.png"-->
        <HelloWorld
            title="Das ist die Homepage"
            msg="Das ist meine erste App"
        />
    </div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '../components/HelloWorld'

	export default {
		name: 'Home',
		components: {
			HelloWorld
		},
	}
</script>
