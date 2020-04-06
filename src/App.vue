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
        mounted() {
            const firebaseApp = document.createElement('script')
            firebaseApp.setAttribute(
                'src',
                '/__/firebase/7.13.2/firebase-app.js"'
            )
            const firebase = document.createElement('script')
            firebase.setAttribute('src', '/__/firebase/init.js')
            document.head.appendChild(firebaseApp)
            document.head.appendChild(firebase)
            return true
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
