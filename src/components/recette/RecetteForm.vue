<template>
    <div>
        <router-link tag="button" to="/recettes"> Retour </router-link>
        <div class="content-recette-form">
            <div class="title">
                <h1>Ajouter une recette</h1>
            </div>
            <div class="recette-form">
                <InputText name="title" label="Titre" :value="recette.title" />
                <InputText
                    name="subtitle"
                    label="Soustitre"
                    :value="recette.subtitle"
                    optionnal
                />
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
                        label="Temps de préparation"
                        :value="recette.infosPratiques.preparation"
                    />
                    <InputText
                        name="repos"
                        label="Temps de repos"
                        :value="recette.infosPratiques.repos"
                        optionnal
                    />
                    <InputText
                        name="cuisson"
                        label="Temps de cuisson"
                        :value="recette.infosPratiques.cuisson"
                        optionnal
                    />
                </div>
                <InputTextMultiple
                    name="materielConseille"
                    label="Matériel conseillé"
                    :value="recette.materielConseille"
                    optionnal
                />
                <div>
                    <h3>Ingrédients</h3>
                    <InputTextMultiple
                        name="principaux"
                        label="Principaux"
                        :value="recette.ingredients.principaux"
                    />
                    <button v-if="!hasSecondPart" @click="addSecondPart()">
                        Ajouter deuxième partie
                    </button>
                    <div v-if="hasSecondPart">
                        <InputText
                            name="title2"
                            label="Titre deuxième partie"
                            :value="recette.ingredients.secondaires.title"
                        />
                        <InputTextMultiple
                            name="secondaires"
                            label="Secondaires"
                            :value="recette.ingredients.secondaires.data"
                        />
                    </div>
                </div>
                <InputTextMultiple
                    name="instructions"
                    label="Instructions"
                    :value="recette.instructions"
                />
                <InputTextMultiple
                    name="astuces"
                    label="Astuces"
                    :value="recette.astuces"
                    optionnal
                />
                <div>
                    <h3>Variantes <span>(optionnel)</span></h3>
                    <div v-if="recette.variantes.length > 0">
                        <div>
                            <h4>
                                <label for="variantesTitle">
                                    Titre
                                </label>
                            </h4>
                            <input
                                v-for="(variante, index) in recette.variantes"
                                :key="index"
                                v-model="recette.variantes[index].title"
                                name="variantesTitle"
                                id="variantesTitle"
                            />
                            <!-- TODO: Si au final lien cliquable need split in 2 inputs: title & link -->
                        </div>
                        <div>
                            <h4>
                                <label for="variantesPath">
                                    Lien
                                </label>
                            </h4>
                            <input
                                v-for="(variante, index) in recette.variantes"
                                :key="index"
                                v-model="recette.variantes[index].path"
                                name="variantesPath"
                                id="variantesPath"
                            />
                            <!-- TODO: Si au final lien cliquable need split in 2 inputs: title & link -->
                        </div>
                    </div>
                    <button
                        @click="addVariantes(recette.variantes[indexVariantes])"
                    >
                        Ajouter
                    </button>
                </div>
                <button @click="addRecette()">Valider</button>
            </div>
        </div>
    </div>
</template>

<script>
import database from '@/firebase/db'
import InputText from '@/components/ui/InputText'
import InputTextMultiple from '@/components/ui/InputTextMultiple'

export default {
    name: 'RecetteForm',
    components: {
        InputText,
        InputTextMultiple,
    },
    data() {
        return {
            indexVariantes: 0,
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
        addVariantes() {
            this.recette.variantes.push({ title: '', path: '' })
        },
        addSecondPart() {
            this.hasSecondPart = true
        },
        async addRecette() {
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
            await database.collection('recettes').add({
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
.recette-form div {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: stretch;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content-recette {
        width: 90%;
    }
}
</style>
