<template>
    <div>
        <div class="auth-form-content">
            <div class="header">
                <div class="title">
                    <div v-if="!isRegistration">
                        <h1>Connexion</h1>
                        <Button asIcon @click.native="switchForm()">
                            <Connect />
                        </Button>
                    </div>
                    <div v-if="isRegistration">
                        <h1>Inscription</h1>
                        <Button asIcon @click.native="switchForm()">
                            <Register />
                        </Button>
                    </div>
                </div>
            </div>
            <div class="auth-form">
                <InputText name="email" type="email" v-model="auth.email">
                    Email
                </InputText>
                <InputText
                    name="password"
                    type="password"
                    v-model="auth.password"
                >
                    Mot de passe
                </InputText>
                <InputText
                    name="confirm"
                    type="password"
                    v-if="isRegistration"
                    v-model="auth.confirm"
                >
                    Confirmation
                </InputText>
                <Button
                    v-if="!isRegistration"
                    @click.native="login()"
                    :disabled="!enabled"
                >
                    Se connecter
                </Button>
                <Button
                    v-if="isRegistration"
                    @click.native="register()"
                    :disabled="!enabled"
                >
                    S'inscrire
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firebase'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import Connect from '@/components/ui/png/Connect'
import Register from '@/components/ui/png/Register'

export default {
    name: 'authForm',
    components: {
        InputText,
        Button,
        Connect,
        Register,
    },
    data() {
        return {
            isRegistration: false, //False when registration blocked
            auth: {
                email: '',
                password: '',
                confirm: '',
            },
        }
    },
    computed: {
        buttonTitle() {
            return this.isRegistration ? 'Connexion' : 'Inscription'
        },
        enabled() {
            const { email, password, confirm } = this.auth
            if (this.isRegistration) {
                return email !== '' && password !== '' && confirm !== ''
            } else {
                return email !== '' && password !== ''
            }
        },
    },
    methods: {
        register() {
            const { email, password, confirm } = this.auth
            // When blocking registration
            // eslint-disable-next-line no-constant-condition
            if (true) {
                alert(
                    "L'inscription est temporairement bloquée, veuillez contacter l'administrateur."
                )
            } else {
                if (password === confirm) {
                    // TODO: Use email verification ?
                    // TODO: save user in DB for grant usage ?
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            console.info('Registration done & logged in')
                            this.$router.push({ path: '/profile' })
                        })
                        .catch(function(error) {
                            // TODO: Show error handeling for user
                            const errorCode = error.code
                            const errorMessage = error.message
                            console.error(errorCode, errorMessage)
                        })
                } else {
                    // TODO: Show error handeling for user
                    console.error(email, password, confirm)
                    alert(
                        "Le mdp ne correspond pas ou un champs n'a pas été rempli"
                    )
                }
            }
        },
        login() {
            const { email, password } = this.auth
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.info('Logged in')
                    this.$router.push({ path: '/profile' })
                })
                .catch(function(error) {
                    // TODO: Show error handeling for user
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.error(errorCode, errorMessage)
                })
        },
        switchForm() {
            this.isRegistration = !this.isRegistration
        },
    },
}
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.auth-form-content {
    display: flex;
    flex-direction: column;
    margin: 0 8px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button-router {
        flex-grow: 0;
    }
    .email {
        flex-grow: 1;
        margin: 0 50px;
    }
}
.auth-form div {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: stretch;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .header .title {
        margin: 0 50px 0 0;
    }
}
</style>
