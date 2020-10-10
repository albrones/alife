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
                    <Button type="validate" @click.native="changePassword()">
                        Changer MDP
                    </Button>
                </div>
                <!-- <InputText name="email" type="email" v-model="profile.email">
                    Email ({{ email }})
                </InputText> -->
                <InputText name="nom" v-model="profile.name">
                    Nom ({{ displayName }})
                </InputText>
                <!-- TODO: avatar choose/change  -->
                <!-- Avatar
                <input
                    name="avatar"
                    type="file"
                    :value="profile.avatar"
                    id="avatar"
                    :onchange="previewImage()"
                /> -->
                <!-- <InputText
                    name="avatarInput"
                    type="file"
                    v-model="profile.avatar"
                    accept=".jpg,.jpeg,.png"
                    @change.native="previewImage()"
                >
                    Avatar
                </InputText>
                <div>
                    <img :src="profile.avatar" alt="" id="avatarPreview" />
                </div> -->
                <Button @click.native="updateUserInfo()">
                    Enregistrer
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firebase'
import storage from '@/firebase/storage'
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
                // avatar: '',
            },
            // newAvatar: '',
            activated: false,
        }
    },
    mounted() {
        // this.$nextTick(() => {
        this.loadInfos()
        // this.uploadImage()
        // })
    },
    computed: {
        email() {
            return this.$store.state.user.email
        },
        displayName() {
            return this.$store.state.user.displayName
        },
        // photoURL() {
        //     return this.newAvatar
        //         ? this.newAvatar
        //         : this.$store.state.user.photoURL
        // },
        baseEmail() {
            return this.email.split('@')[0]
        },
        isLogged() {
            return this.$store.state.isLogged
        },
    },
    watch: {
        isLogged() {
            this.loadInfos()
        },
    },
    methods: {
        updateUserInfo() {
            const user = firebase.auth().currentUser
            const userData = {
                email: this.profile.email,
                displayName: this.profile.name,
                photoURL: this.profile.avatar,
            }

            user.updateProfile(userData).then(() => {
                this.$store.commit('saveUserInfo', userData)
                console.info('Logged out')
            })
            // user.updateEmail(this.profile.email)
            //     .then(() => {
            //         console.info('Email changed')
            //     })
            //     .catch(error => {
            //         console.error(error)
            //     })
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
                .then(() => {
                    // TODO: Show error handeling for user
                    console.info('Email sent')
                    alert('Un email vous a été envoyé.') //TODO: Toaster ?
                })
                .catch(error => {
                    // TODO: Show error handeling for user
                    console.error(error)
                })
        },
        uploadImage() {
            const storageRef = storage.ref()
            storageRef
                .child('avatars/' + this.baseEmail + '.png')
                .getDownloadURL()
                .then(url => {
                    // `url` is the download URL for 'images/stars.jpg'

                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest()
                    xhr.responseType = 'blob'
                    xhr.onload = event => {
                        const blob = xhr.response
                    }
                    xhr.open('GET', url)
                    xhr.send()

                    // Or inserted into an <img> element:
                    const preview = document.getElementById('avatarPreview')
                    preview.src = url
                })
                .catch(error => {
                    // TODO: Show error handeling for user
                    console.error(error)
                })
        },
        // previewImage() {
        //     if (this.profile.avatar) {
        //         const fileReader = new FileReader()
        //         fileReader.readAsDataURL(
        //             document.getElementById('avatarInput').files[0]
        //         )

        //         fileReader.onload = function(FREvent) {
        //             document.getElementById('avatarPreview').src =
        //                 FREvent.target.result
        //         }
        //     }
        // },
        loadInfos() {
            console.log('loadInfos')
            this.profile.email = this.email ? this.email : ''
            this.profile.name = this.displayName ? this.displayName : ''
            // this.profile.avatar = this.photoURL ? this.photoURL : ''
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
#avatarPreview {
    width: 125px;
    height: auto;
    align-self: center;
}
</style>
