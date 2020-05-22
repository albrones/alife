<template>
    <div>
        <div class="auth-form-content">
            <div class="header">
                <div class="title">
                    <h1 v-if="!isRegistration">Connexion</h1>
                    <h1 v-if="isRegistration">
                        Inscription
                    </h1>
                    <Button @click.native="switchForm()">{{
                        buttonTitle
                    }}</Button>
                    <!-- TODO: Switch icon ? -->
                </div>
            </div>
            <div class="auth-form">
                <InputText name="email" v-model="auth.email">
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

export default {
    name: 'authForm',
    components: {
        InputText,
        Button,
    },
    data() {
        return {
            isRegistration: true,
            auth: {
                email: '',
                password: '',
                confirm: '',
            },
        }
    },
    computed: {
        buttonTitle() {
            return this.isRegistration
                ? 'Aller à la connexion'
                : "Aller à l'inscription"
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
            if (password === confirm) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => console.log('Registration done & logged'))
                    .catch(function(error) {
                        // TODO: Show error handeling for user
                        const errorCode = error.code
                        const errorMessage = error.message
                        console.log(errorCode, errorMessage)
                    })
            } else {
                // TODO: Show error handeling for user
                console.log(email, password, confirm)
                alert(
                    "Le mdp ne correspond pas ou un champs n'a pas été rempli"
                )
            }
        },
        login() {
            const { email, password } = this.auth
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => console.log('Logged in'))
                .catch(function(error) {
                    // TODO: Show error handeling for user
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
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
