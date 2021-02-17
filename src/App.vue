<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Todos</router-link>
            |
            <router-link to="/form">Form</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <a v-if="myUser" @click.prevent="handleLogout">Logout ({{ myUser.name }})</a>
            <router-link v-else to="/login">Login</router-link>
        </div>
        <router-view/>
    </div>
</template>
<script>
import {mapActions} from "vuex";
import store from "@/store";

export default {
    name: 'App',
    data() {
        return {
            userName: localStorage.getItem('user.name') ?? null
        }
    },
    methods: {
        ...mapActions({
            logout: 'user/logout',
        }),
        handleLogout() {
            this.logout()
        },
    },
    computed: {
        myUser() {
            return store.getters['user/myUser']
        }
    },

}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
a {
    cursor: pointer;
}
</style>
