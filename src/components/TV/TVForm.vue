<template>
    <div>
        <div class="content-tv-form">
            <div class="header">
                <ButtonRouter class="button-router" path="/tv">
                    <Chevron />
                </ButtonRouter>
                <div class="title">
                    <h1 v-if="!isForEdit">Ajouter un film ou une série</h1>
                    <h1 v-if="isForEdit">
                        Editer le film ou la série: {{ tv.title }}
                    </h1>
                </div>
            </div>
            <div class="tv-form">
                <InputText name="title" v-model="tv.title">
                    Titre
                </InputText>
                <InputText name="subtitle" v-model="tv.subtitle" optionnal>
                    Soustitre
                </InputText>
                <div v-if="false">
                    <label for="image">
                        <h3>Image principal <span>(optionnel)</span></h3>
                    </label>
                    <input
                        :value="tv.images[0]"
                        type="file"
                        name="image"
                        id="image"
                        v-on:input="searchText = $event.target.value"
                    />
                    <!-- TODO:  @change="upload" -->
                </div>
                <Button v-if="!isForEdit" @click.native="addTV()">
                    Ajouter
                </Button>
                <Button v-if="isForEdit" @click.native="editTV()">
                    Editer
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import database from '@/firebase/db'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import Chevron from '@/components/ui/png/Chevron'
import ButtonRouter from '@/components/ui/ButtonRouter'

export default {
    name: 'TVForm',
    components: {
        InputText,
        Button,
        Chevron,
        ButtonRouter,
    },
    data() {
        return {
            isForEdit: false,
            idTV: this.$route.params.id,
            tv: {
                title: '',
                subtitle: '',
                images: [],
            },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.isForEdit = true
            this.getTVToEdit(this.idTV)
        }
    },
    methods: {
        upload(e) {
            //TODO
            e.preventDefault()
            const files = this.$$.avatar.files
            const data = new FormData()
            // for single file
            data.append('avatar', files[0])
            // Or for multiple files you can also do
            //  _.each(files, function(v, k){
            //    data.append('avatars['+k+']', v);
            // });

            // this.$http
            //     .post('/avatars/upload', data, function(data, status, request) {
            //         //handling
            //     })
            //     .error(function(data, status, request) {
            //         //handling
            //     })
        },
        addTV() {
            const { title, subtitle, images } = this.tv
            if (title !== '') {
                database
                    .collection('tv')
                    .add({
                        date: this.setCurrentDate(),
                        // id: title,
                        title,
                        subtitle,
                        images,
                    })
                    .then(doc => this.goToTVFinished(doc.id))
            }
        },
        editTV() {
            database
                .collection('tv')
                .doc(this.idTV)
                .set({
                    date: this.setCurrentDate(),
                    ...this.tv,
                })
                .then(this.goToTVFinished(this.idTV))
        },
        async getTVToEdit() {
            await database
                .collection('tv')
                .doc(this.idTV)
                .get()
                .then(doc => {
                    this.tv = doc.data()
                })
        },
        goToTVFinished() {
            // this.$router.push({ path: `/tv/${id}` }) //TODO: add fiche
            this.$router.push({ path: `/tv` })
        },
        setCurrentDate() {
            return new Date().toLocaleString()
        },
    },
}
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.content-tv-form {
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
    .title {
        flex-grow: 1;
        margin: 0 50px;
    }
}
.tv-form div {
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
