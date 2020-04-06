<template>
    <div id="app">
        <div class="logo">
            <!-- TODO: Add logo at left -->
            <h1 v-if="this.$router.currentRoute.path === '/'">
                ALIFE
            </h1>
        </div>
        <div id="nav">
            <!-- TODO: Sticky ?  -->
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/recettes">Recettes</router-link>
        </div>
        <router-view />
        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="/__/firebase/7.13.2/firebase-app.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

        <!-- Initialize Firebase -->
        <script src="/__/firebase/init.js"></script>
    </div>
</template>

<script>
export default {
    computed: {
        check() {
            return (
                // this.$router.currentRoute === this.$route
                this.$router.currentRoute.path === '/'
            )
        },
    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
