<template>
    <div id="app">
        <div class="logo">
            <!-- TODO: Add logo at left w sticky-->
            <Logo v-if="this.$router.currentRoute.path !== '/'" />
            <h1
                v-if="this.$router.currentRoute.path === '/'"
                class="dynamic-title"
            >
                ALIFE
            </h1>
        </div>
        <div>
            <div>
                <div>
                    <div id="nav" v-if="this.$router.currentRoute.path !== '/'">
                        <!-- <router-link to="/about">About</router-link> | -->
                        <router-link to="/recettes">Recettes</router-link> |
                        <router-link to="/cinema">Cinema</router-link> |
                        <router-link to="/music">Musique</router-link> |
                        <router-link to="/pomodoro">Pomodoro</router-link>
                    </div>
                    <div>
                        <!-- theme switcher -->
                        <input
                            type="checkbox"
                            id="theme-switch"
                            class="theme-switch"
                            v-model="darkMode"
                        />
                        <label for="theme-switch">
                            <span v-if="darkMode === true">
                                <img
                                    alt="logo"
                                    src="./assets/sun.png"
                                    width="40"
                                />
                            </span>
                            <span v-else>
                                <img
                                    alt="logo"
                                    src="./assets/moon.png"
                                    width="40"
                                />
                            </span>
                        </label>
                    </div>
                </div>
                <div class="dynamic-subtitle">
                    <!-- content -->
                    <!-- TODO: Sticky ?  -->
                    <router-view class="content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/components/ui/png/Logo'

export default {
    components: {
        Logo,
    },
    data() {
        return {
            darkMode: false,
        }
    },
    computed: {
        check() {
            return (
                // this.$router.currentRoute === this.$route
                this.$router.currentRoute.path === '/'
            )
        },
    },
    mounted() {
        // set 'app-background' class to body
        const bodyElement = document.body
        bodyElement.classList.add('app-background')

        // check for active theme
        const htmlElement = document.documentElement
        const theme = localStorage.getItem('theme')

        if (theme === 'dark') {
            htmlElement.setAttribute('theme', 'dark')
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.darkMode = true
        } else {
            htmlElement.setAttribute('theme', 'light')
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.darkMode = false
        }

        const firebaseApp = document.createElement('script')
        firebaseApp.setAttribute('src', '/__/firebase/7.13.2/firebase-app.js"')
        const firebase = document.createElement('script')
        firebase.setAttribute('src', '/__/firebase/init.js')
        document.head.appendChild(firebaseApp)
        document.head.appendChild(firebase)
        return true
    },
    watch: {
        darkMode() {
            // add/remove class to/from html tag
            const htmlElement = document.documentElement
            if (this.darkMode) {
                localStorage.setItem('theme', 'dark')
                htmlElement.setAttribute('theme', 'dark')
            } else {
                localStorage.setItem('theme', 'light')
                htmlElement.setAttribute('theme', 'light')
            }
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
    // color: #2c3e50;
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
