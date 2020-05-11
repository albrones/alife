<template>
    <div>
        <div class="content-series-form">
            <div class="header">
                <ButtonRouter class="button-router" path="/cinema">
                    <Chevron />
                </ButtonRouter>
                <div class="title">
                    <h1 v-if="!isForEdit">Ajouter série</h1>
                    <h1 v-if="isForEdit">
                        Editer la série: {{ series.title }}
                    </h1>
                </div>
            </div>
            <div class="series-form">
                <InputText name="title" v-model="series.title">
                    Titre
                </InputText>
                <InputText name="subtitle" v-model="series.subtitle" optionnal>
                    Soustitre
                </InputText>
                <div v-if="false">
                    <label for="image">
                        <h3>Image principal <span>(optionnel)</span></h3>
                    </label>
                    <input
                        :value="series.images[0]"
                        type="file"
                        name="image"
                        id="image"
                        v-on:input="searchText = $event.target.value"
                    />
                    <!-- TODO:  @change="upload" -->
                </div>
                <Button v-if="!isForEdit" @click.native="addSeries()">
                    Ajouter
                </Button>
                <Button v-if="isForEdit" @click.native="editSeries()">
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
    name: 'SeriesForm',
    components: {
        InputText,
        Button,
        Chevron,
        ButtonRouter,
    },
    data() {
        return {
            isForEdit: false,
            idSeries: this.$route.params.id,
            series: {
                title: '',
                subtitle: '',
                images: [],
            },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.isForEdit = true
            this.getSeriesToEdit(this.idSeries)
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
        addSeries() {
            const { title, subtitle, images } = this.series
            if (title !== '') {
                database
                    .collection('series')
                    .add({
                        date: this.setCurrentDate(),
                        // id: title,
                        title,
                        subtitle,
                        images,
                    })
                    .then(doc => this.goToSeriesFinished(doc.id))
            }
        },
        editSeries() {
            database
                .collection('series')
                .doc(this.idSeries)
                .set({
                    date: this.setCurrentDate(),
                    ...this.series,
                })
                .then(this.goToSeriesFinished(this.idSeries))
        },
        async getSeriesToEdit() {
            await database
                .collection('series')
                .doc(this.idSeries)
                .get()
                .then(doc => {
                    this.series = doc.data()
                })
        },
        goToSeriesFinished() {
            // this.$router.push({ path: `/series/${id}` }) //TODO: add fiche
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
.content-series-form {
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
.series-form div {
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
