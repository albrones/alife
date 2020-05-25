<template>
    <div id="app">
        <div class="header">
            <div class="logo">
                <!-- TODO: Add logo at left w sticky-->
                <Logo v-if="this.$router.currentRoute.path !== '/'" />
                <h1 v-if="this.$router.currentRoute.path === '/'">
                    ALIFE
                </h1>
            </div>
            <div class="auth">
                <ButtonRouter path="/auth" v-if="!isLogged">Auth</ButtonRouter>
                <Button asIcon @click.native="signOut()" v-if="isLogged">
                    Sign out
                </Button>
                <!-- TODO: icon and state gesture -->
            </div>
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
import firebase from '@/firebase/firebase'
import Logo from '@/components/ui/png/Logo'
import ButtonRouter from '@/components/ui/ButtonRouter'
import Button from '@/components/ui/Button'

export default {
    components: {
        Logo,
        Button,
        ButtonRouter,
    },
    data() {
        return {
            logged: false,
        }
    },
    computed: {
        check() {
            return (
                // this.$router.currentRoute === this.$route
                this.$router.currentRoute.path === '/'
            )
        },
        isLogged: {
            get() {
                return this.logged
            },
            set(newStatus) {
                this.logged = newStatus
            },
        },
    },
    mounted() {
        this.checkUserConnected()
    },
    methods: {
        checkUserConnected() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    // User is signed in.
                    // const displayName = user.displayName
                    // const email = user.email
                    // const emailVerified = user.emailVerified
                    // const photoURL = user.photoURL
                    // const isAnonymous = user.isAnonymous
                    // const uid = user.uid
                    // const providerData = user.providerData
                    // ...
                    this.isLogged = true
                } else {
                    // User is signed out.
                    this.isLogged = false
                }
            })
        },
        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => console.log('Signed out'))
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
.header {
    display: flex;
}
.logo {
    flex-grow: 1;
    margin-left: 50px;
}
.auth {
    padding-top: 10px;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content {
        width: 100%;
        // margin: 0 8px;
    }
}
</style>
