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
            <b-btn role="button" @click="login">Login</b-btn>
        </b-form>
    </div>
</template>

<script>
import axios from "axios";

const apiURL = "http://videostore.loc/api/login";

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
        login() {
            console.info(this.user)
            axios.post(apiURL, this.user)
                .then(resp => {
                    localStorage.setItem('user.name', resp.data.name);
                    localStorage.setItem('user.token', resp.data.token);
                    const userName = localStorage.getItem('user.name');
                    const userToken = localStorage.getItem('user.token');
                    console.info(userName);
                    console.info(userToken);
                })
                .catch(err => {
                    console.info(err.data)
                });
        }
    }
}
</script>

<style scoped>

</style>
