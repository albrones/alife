<template>
    <div class="content-recette" v-if="isLoaded">
        <div class="title">
            <h1>{{ recette.title }}</h1>
            <h3>
                {{ recette.subtitle }} - {{ recette.date }}
                <!-- TODO: grisser / mettre en secondaire -->
            </h3>
        </div>
        <!-- TODO: make all part optionnal rendered -->
        <ImageRecette :data="recette.images" />
        <InfosPratiques :data="recette.infosPratiques" />
        <MaterielConseille :data="recette.materielConseille" />
        <Ingredients :data="recette.ingredients" />
        <Instructions :data="recette.instructions" />
        <Astuces :data="recette.astuces" />
        <Variantes :data="recette.variantes" />
        <!-- TODO:
            Autres Photos (galerie)
         -->
    </div>
</template>

<script>
import database from '@/firebase/db'
// @ is an alias to /src
import InfosPratiques from '@/components/recette/InfosPratiques'
import MaterielConseille from '@/components/recette/MaterielConseille'
import ImageRecette from '@/components/recette/ImageRecette'
import Ingredients from '@/components/recette/Ingredients'
import Instructions from '@/components/recette/Instructions'
import Astuces from '@/components/recette/Astuces'
import Variantes from '@/components/recette/Variantes'
export default {
    name: 'Recette',
    components: {
        InfosPratiques,
        MaterielConseille,
        ImageRecette,
        Ingredients,
        Instructions,
        Astuces,
        Variantes,
    },
    data() {
        return {
            isLoaded: false,
            recette: {
                date: '',
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
        this.getRecetteById()
        this.isLoaded = true
    },
    methods: {
        async getRecetteById() {
            const path = this.$route.params.id

            await database
                .collection('recettes')
                .doc(path)
                .get()
                .then(doc => {
                    this.recette = doc.data()
                })
        },
    },
}
</script>

<style scoped>
/* TODO: use Grid or Flex to design correctly */
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content-recette {
        margin: 0 16px;
    }
}
.content-recette {
    align-items: unset;
}
</style>
