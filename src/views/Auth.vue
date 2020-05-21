<template>
    <div>
        <div class="auth-form-content">
            <div class="header">
                <div class="title">
                    <!-- <h1 v-if="!isForEdit">Connexion</h1> -->
                    <h1 v-if="isForEdit">
                        Inscription
                    </h1>
                </div>
            </div>
            <div class="auth-form">
                <InputText name="email" v-model="auth.email">
                    Email
                </InputText>
                <InputText name="password" v-model="auth.password">
                    Mot de passe
                </InputText>
                <InputText name="confirm" v-model="auth.confirm">
                    Confirmation
                </InputText>
                <!-- <Button v-if="!isForEdit" @click.native="submit()">
                    Ajouter
                </Button> -->
                <Button v-if="isForEdit" @click.native="submit()">
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
            isForEdit: false,
            auth: {
                email: '',
                password: '',
                confirm: '',
            },
        }
    },
    mounted() {
        this.isForEdit = true
    },
    methods: {
        submit() {
            const { email, password, confirm } = this.auth
            if (password === confirm) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => console.log('Done'))
                    .catch(function(error) {
                        // TODO: Show error handeling for user
                        const errorCode = error.code
                        const errorMessage = error.message
                        console.log(errorCode, errorMessage)
                    })
            } else {
                console.log(email, password, confirm)
                alert(
                    "Le mdp ne correspond pas ou un champs n'a pas été rempli"
                )
            }
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
