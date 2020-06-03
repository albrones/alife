<template>
    <div>
        <div class="profile-content">
            <div class="header">
                <div class="title">
                    <h1>Profil</h1>
                </div>
            </div>
            <div class="profile">
                <div class="actions">
                    <Button type="attention" @click.native="changePassword()">
                        Changer MDP
                    </Button>
                    <Button type="warning" @click.native="logout()">
                        Se déconnecter
                    </Button>
                </div>
                <InputText name="email" type="email" v-model="profile.email">
                    Email (Actuel: {{ email }})
                </InputText>
                <InputText name="nom" v-model="profile.name">
                    Nom (Actuel: {{ displayName }})
                </InputText>
                <Button @click.native="updateUserInfo()">
                    Enregistrer
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firebase'
import Button from '@/components/ui/Button'
import InputText from '@/components/ui/InputText'

export default {
    name: 'Profile',
    components: {
        Button,
        InputText,
    },
    data() {
        return {
            profile: {
                password: '',
                confirm: '',
                email: '',
                name: '',
            },
            activated: false,
        }
    },
    computed: {
        email() {
            return this.$store.state.user.email
        },
        displayName() {
            return this.$store.state.user.displayName
        },
    },
    methods: {
        updateUserInfo() {
            const user = firebase.auth().currentUser
            const userData = {
                email: this.email,
                displayName: this.displayName,
            }
            user.updateProfile(userData).then(() => {
                this.$store.commit('saveUserInfo', userData)
                console.info('Logged out')
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
        changePassword() {
            firebase.auth().languageCode = 'fr'
            const auth = firebase.auth()

            auth.sendPasswordResetEmail(this.email)
                .then(function() {
                    // TODO: Show error handeling for user
                    console.info('Email sent')
                    alert('Un email vous a été envoyé.') //TODO: Toaster ?
                })
                .catch(function(error) {
                    // TODO: Show error handeling for user
                    console.error(error)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 8px;
}
.profile .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.profile div {
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

.modal-body .input-text {
    margin: 8px 16px 8px 8px;
    width: auto;
}
</style>
