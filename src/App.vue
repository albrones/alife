<template>
    <div id="app">
        <div class="header">
            <div class="logo" :class="{ 'as-right-button': !onAuthPage }">
                <!-- TODO: Add logo at left w sticky-->
                <Logo class="logo-icon" v-if="!onHomepage" />
                <h1 v-if="onHomepage">ALIFE</h1>
            </div>
            <div class="auth">
                <ButtonRouter path="/auth" v-if="!isLogged && !onAuthPage">
                    <Register />
                </ButtonRouter>
                <!-- {{ userName }} -->
                <ButtonRouter path="/profile" v-if="isLogged && !onProfilePage">
                    <Profile />
                </ButtonRouter>
                <ButtonRouter
                    path=""
                    @click.native="logout()"
                    v-if="isLogged && onProfilePage"
                >
                    <Logout />
                </ButtonRouter>
            </div>
        </div>
        <!-- TODO: Sticky ?  -->
        <div id="nav" v-if="onHomepage">
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
import Register from '@/components/ui/png/Register'
import Profile from '@/components/ui/png/Profile'
import Logout from '@/components/ui/png/Logout'
import ButtonRouter from '@/components/ui/ButtonRouter'

export default {
    components: {
        Logo,
        Register,
        Profile,
        ButtonRouter,
        Logout,
    },
    data() {
        return {
            logged: false,
            userName: '',
        }
    },
    computed: {
        onHomepage() {
            return this.$route.path === '/'
        },
        onAuthPage() {
            return this.$route.path === '/auth'
        },
        onProfilePage() {
            return this.$route.path === '/profile'
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
                    const {
                        displayName,
                        email,
                        emailVerified,
                        photoURL,
                        isAnonymous,
                        uid,
                        providerData,
                    } = user

                    const userData = {
                        displayName,
                        email,
                        emailVerified,
                        photoURL,
                        isAnonymous,
                        uid,
                        providerData,
                    }
                    this.userName = displayName
                    this.$store.commit('saveUserInfo', userData)
                    this.isLogged = true
                } else {
                    // User is signed out.
                    this.$store.commit('removeUserInfo')
                    this.isLogged = false
                }
            })
        },
        logout() {
            firebase
                .auth()
                .signOut()
                .then(this.$store.commit('removeUserInfo'))
                .then(() => {
                    console.info('Logged out')
                    this.$router.push({ path: '/' })
                })
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
    align-items: center;
}
.logo {
    flex-grow: 1;
}
.as-right-button {
    margin-left: 50px;
}
.auth {
    padding: 10px 0 16px 0;
    flex-grow: 0;
}
.logo-icon {
    display: block;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content {
        width: 100%;
        // margin: 0 8px;
    }
}
</style>
