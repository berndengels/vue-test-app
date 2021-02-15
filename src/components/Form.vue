<template>
    <div>
        <h3 v-if="msg">
            {{ msg }}
        </h3>
        <h3 v-else>
            Mein Formular
        </h3>
        <div>
            <form>
                <label for="myMsg">Message: </label>
                <input id="myMsg" v-model="msg" type="text"
                >
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Form",
    data() {
        return {
            msg: null,
        }
    }
}
</script>

<style scoped>

</style>
