<template>
    <div id="app">
        <div class="logo">
            <!-- TODO: Add logo at left w sticky-->
            <Logo v-if="this.$router.currentRoute.path !== '/'" />
            <h1 v-if="this.$router.currentRoute.path === '/'">
                ALIFE
            </h1>
        </div>
        <!-- TODO: Sticky ?  -->
        <div id="nav" v-if="this.$router.currentRoute.path !== '/'">
            <!-- <router-link to="/about">About</router-link> | -->
            <router-link to="/recettes">Recettes</router-link> |
            <router-link to="/cinema">Cinema</router-link> |
            <router-link to="/music">Musique</router-link> |
            <router-link to="/pomodoro">Pomodoro</router-link>
        </div>
        <router-view class="content" />
    </div>
</template>

<script>
import Logo from '@/components/ui/png/Logo'

export default {
    components: {
        Logo,
    },
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

<style lang="scss" scoped>
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
.content {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    align-items: center;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content {
        width: 100%;
        // margin: 0 8px;
    }
}
</style>
