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
                    <Button
                        type="attention"
                        @click.native="showModal()"
                        v-if="activated"
                    >
                        Changer MDP
                    </Button>
                    <Button type="warning" @click.native="logout()">
                        Se déconnecter
                    </Button>
                </div>
                <InputText name="email" type="email" v-model="email">
                    Email
                </InputText>
                <InputText name="nom" v-model="displayName">
                    Nom
                </InputText>
                <Button @click.native="updateUserInfo()">
                    Enregistrer
                </Button>
            </div>
            <Modal
                v-show="isModalVisible"
                @close="closeModal"
                @action="alert('a')"
                title="Changer de mdp"
            >
                <InputText
                    name="password"
                    type="password"
                    v-model="profile.password"
                >
                    Mot de passe
                </InputText>
                <InputText
                    name="confirm"
                    type="password"
                    v-model="profile.confirm"
                >
                    Confirmation
                </InputText>
            </Modal>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firebase'
import Button from '@/components/ui/Button'
import InputText from '@/components/ui/InputText'
import Modal from '@/components/ui/Modal'

export default {
    name: 'Profile',
    components: {
        Button,
        InputText,
        Modal,
    },
    data() {
        return {
            profile: {
                password: '',
                confirm: '',
            },
            isModalVisible: false,
            activated: false,
        }
    },
    computed: {
        email: {
            get() {
                return this.$store.state.user.email
            },
            set(newStatus) {
                this.email = newStatus
            },
        },
        displayName: {
            get() {
                return this.$store.state.user.displayName
            },
            set(newStatus) {
                this.displayName = newStatus
            },
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
        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
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
</style>
