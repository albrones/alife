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
                <div>
                    <h4>
                        <label for="materielConseille">
                            Matériel conseillé <span>(optionnel)</span>
                        </label>
                    </h4>
                    <input
                        v-for="(materiel, index) in recette.materielConseille"
                        :key="index"
                        v-model="recette.materielConseille[index]"
                        name="materielConseille"
                        id="materielConseille"
                    />
                    <button @click="addItem(recette.materielConseille)">
                        Ajouter
                    </button>
                </div>
                <div>
                    <h3>Ingrédients</h3>
                    <div>
                        <h4><label for="principaux">Principaux</label></h4>
                        <input
                            v-for="(ingredient, index) in recette.ingredients
                                .principaux"
                            :key="index"
                            v-model="recette.ingredients.principaux[index]"
                            name="principaux"
                            id="principaux"
                        />
                        <button
                            @click="addItem(recette.ingredients.principaux)"
                        >
                            Ajouter
                        </button>
                    </div>
                    <button v-if="!hasSecondPart" @click="addSecondPart()">
                        Ajouter deuxième partie
                    </button>
                    <div v-if="hasSecondPart">
                        <InputText
                            name="title2"
                            label="Titre deuxième partie"
                            :value="recette.ingredients.secondaires.title"
                        />

                        <div>
                            <h4>
                                <label for="secondaires">
                                    Secondaires
                                </label>
                            </h4>
                            <input
                                v-for="(ingredient, index) in recette
                                    .ingredients.secondaires.data"
                                :key="index"
                                v-model="
                                    recette.ingredients.secondaires.data[index]
                                "
                                name="secondaires"
                                id="secondaires"
                            />
                            <button
                                @click="
                                    addItem(
                                        recette.ingredients.secondaires.data
                                    )
                                "
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3><label for="instructions">Instructions</label></h3>
                    <input
                        v-for="(instruction, index) in recette.instructions"
                        :key="index"
                        v-model="recette.instructions[index]"
                        name="instructions"
                        id="instructions"
                    />
                    <button @click="addItem(recette.instructions)">
                        Ajouter
                    </button>
                </div>
                <div>
                    <h3>
                        <label for="astuces">
                            Astuces <span>(optionnel)</span>
                        </label>
                    </h3>
                    <input
                        v-for="(astuce, index) in recette.astuces"
                        :key="index"
                        v-model="recette.astuces[index]"
                        name="astuces"
                        id="astuces"
                    />
                    <button @click="addItem(recette.astuces)">
                        Ajouter
                    </button>
                </div>
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

export default {
    name: 'RecetteForm',
    components: {
        InputText,
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
        addItem(array) {
            array.push('')
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
