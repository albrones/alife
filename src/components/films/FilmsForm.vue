<template>
    <div>
        <div class="content-films-form">
            <div class="header">
                <ButtonRouter class="button-router" path="/cinema">
                    <Chevron />
                </ButtonRouter>
                <div class="title">
                    <h1 v-if="!isForEdit">Ajouter un film</h1>
                    <h1 v-if="isForEdit">Editer le film: {{ films.title }}</h1>
                </div>
            </div>
            <div class="films-form">
                <InputText name="title" v-model="films.title">
                    Titre
                </InputText>
                <InputText name="subtitle" v-model="films.subtitle" optionnal>
                    Soustitre
                </InputText>
                <div v-if="false">
                    <label for="image">
                        <h3>Image principal <span>(optionnel)</span></h3>
                    </label>
                    <input
                        :value="films.images[0]"
                        type="file"
                        name="image"
                        id="image"
                        v-on:input="searchText = $event.target.value"
                    />
                    <!-- TODO:  @change="upload" -->
                </div>
                <Button v-if="!isForEdit" @click.native="addFilms()">
                    Ajouter
                </Button>
                <Button v-if="isForEdit" @click.native="editFilms()">
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
    name: 'FilmsForm',
    components: {
        InputText,
        Button,
        Chevron,
        ButtonRouter,
    },
    data() {
        return {
            isForEdit: false,
            idFilms: this.$route.params.id,
            films: {
                title: '',
                subtitle: '',
                images: [],
            },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.isForEdit = true
            this.getFilmsToEdit(this.idFilms)
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
        addFilms() {
            const { title, subtitle, images } = this.films
            if (title !== '') {
                database
                    .collection('films')
                    .add({
                        date: this.setCurrentDate(),
                        // id: title,
                        title,
                        subtitle,
                        images,
                    })
                    .then(doc => this.goToFilmsFinished(doc.id))
            }
        },
        editFilms() {
            database
                .collection('films')
                .doc(this.idFilms)
                .set({
                    date: this.setCurrentDate(),
                    ...this.films,
                })
                .then(this.goToFilmsFinished(this.idFilms))
        },
        async getFilmsToEdit() {
            await database
                .collection('films')
                .doc(this.idFilms)
                .get()
                .then(doc => {
                    this.films = doc.data()
                })
        },
        goToFilmsFinished() {
            // this.$router.push({ path: `/films/${id}` }) //TODO: add fiche
            this.$router.push({ path: `/cinema` })
        },
        setCurrentDate() {
            return new Date().toLocaleString()
        },
    },
}
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.content-films-form {
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
.films-form div {
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
