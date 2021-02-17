<template>
    <div class="container align-content-center">
        <b-form class="align-self-center m-5" @submit.prevent>
            <b-form-group>
                <label for="email">Email: </label>
                <b-input id="email" v-model="user.email" required type="email"/>
            </b-form-group>
            <b-form-group>
                <label for="password">Passwort: </label>
                <b-input id="password" v-model="user.password" required type="password"/>
            </b-form-group>
            <b-btn role="button" @click="handleLogin">Login</b-btn>
        </b-form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: "Login",
    data() {
        return {
            user: {
                email: "engels@f50.de",
                password: "password",
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'user/login',
        }),
        handleLogin() {
            this.login(this.user)
        },
    },
}
</script>

<style scoped>

</style>
