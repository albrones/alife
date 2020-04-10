<template>
    <div>
        <router-link tag="button" to="/recettes"> Retour </router-link>
        <div class="content-recette-form">
            <div class="title">
                <h1 v-if="!isForEdit">Ajouter une recette</h1>
                <h1 v-if="isForEdit">Editer la recette: {{ recette.title }}</h1>
            </div>
            <div class="recette-form">
                <InputText name="title" v-model="recette.title"
                    >Titre</InputText
                >
                <InputText name="subtitle" v-model="recette.subtitle" optionnal>
                    Soustitre
                </InputText>
                <div v-if="false">
                    <label for="image">
                        <h3>Image principal <span>(optionnel)</span></h3>
                    </label>
                    <input
                        :value="recette.images[0]"
                        type="file"
                        name="image"
                        id="image"
                        v-on:input="searchText = $event.target.value"
                    />
                    <!-- TODO:  @change="upload" -->
                </div>
                <div>
                    <h3>Infos Pratique</h3>
                    <InputText
                        name="preparation"
                        v-model="recette.infosPratiques.preparation"
                    >
                        Temps de préparation
                    </InputText>
                    <InputText
                        name="repos"
                        v-model="recette.infosPratiques.repos"
                        optionnal
                    >
                        Temps de repos
                    </InputText>
                    <InputText
                        name="cuisson"
                        v-model="recette.infosPratiques.cuisson"
                        optionnal
                    >
                        Temps de cuisson
                    </InputText>
                </div>
                <InputTextMultiple
                    name="materielConseille"
                    :value="recette.materielConseille"
                    optionnal
                >
                    Matériel conseillé
                </InputTextMultiple>
                <div>
                    <h3>Ingrédients</h3>
                    <InputTextMultiple
                        name="principaux"
                        :value="recette.ingredients.principaux"
                    >
                        Principaux
                    </InputTextMultiple>

                    <Button
                        v-if="!hasSecondPart"
                        @click.native="addSecondPart()"
                    >
                        Ajouter deuxième partie
                    </Button>
                    <div v-if="hasSecondPart" class="ingredients-second-part">
                        <InputText
                            name="title2"
                            v-model="recette.ingredients.secondaires.title"
                        >
                            Titre deuxième partie
                        </InputText>
                        <InputTextMultiple
                            name="secondaires"
                            :value="recette.ingredients.secondaires.data"
                        >
                            Secondaires
                        </InputTextMultiple>
                    </div>
                </div>
                <InputTextMultiple
                    name="instructions"
                    :value="recette.instructions"
                >
                    Instructions
                </InputTextMultiple>
                <InputTextMultiple
                    name="astuces"
                    :value="recette.astuces"
                    optionnal
                >
                    Astuces
                </InputTextMultiple>
                <InputLinkMultiple
                    name="variantes"
                    :value="recette.variantes"
                    optionnal
                >
                    Variantes
                </InputLinkMultiple>
                <Button v-if="!isForEdit" @click.native="addRecette()">
                    Ajouter recette
                </Button>
                <Button v-if="isForEdit" @click.native="editRecette()">
                    Editer recette
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import database from '@/firebase/db'
import InputText from '@/components/ui/InputText'
import InputTextMultiple from '@/components/ui/InputTextMultiple'
import InputLinkMultiple from '@/components/ui/InputLinkMultiple'
import Button from '@/components/ui/Button'

export default {
    name: 'RecetteForm',
    components: {
        InputText,
        InputTextMultiple,
        InputLinkMultiple,
        Button,
    },
    data() {
        return {
            isForEdit: false,
            idRecette: this.$route.params.id,
            hasSecondPart: false,
            recette: {
                title: '',
                subtitle: '',
                images: [],
                infosPratiques: { preparation: '', repos: '', cuisson: '' },
                materielConseille: [],
                ingredients: {
                    principaux: [],
                    secondaires: {
                        title: '',
                        data: [],
                    },
                },
                instructions: [],
                astuces: [],
                variantes: [],
            },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.isForEdit = true
        }
        if (this.isForEdit) {
            this.getRecetteToEdit(this.idRecette)
            const { secondaires } = this.recette.ingredients
            if (secondaires && secondaires.title) {
                this.hasSecondPart = true
            }
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
        addSecondPart() {
            this.hasSecondPart = true
        },
        addRecette() {
            const {
                title,
                subtitle,
                images,
                infosPratiques,
                materielConseille,
                ingredients,
                instructions,
                astuces,
                variantes,
            } = this.recette
            // if (title !== '') {
            database.collection('recettes').add({
                // id: title,
                title,
                subtitle,
                images,
                infosPratiques,
                materielConseille,
                ingredients,
                instructions,
                astuces,
                variantes,
            })
            // }
        },
        async editRecette() {
            await database
                .collection('recettes')
                .doc(this.idRecette)
                .set({
                    ...this.recette,
                })
        },
        async getRecetteToEdit() {
            await database
                .collection('recettes')
                .doc(this.idRecette)
                .get()
                .then(doc => {
                    this.recette = doc.data()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.content-recette-form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}
.ingredients-second-part {
    width: 100%;
}
.recette-form div {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: stretch;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content-recette-form {
        width: 90%;
    }
}
</style>
