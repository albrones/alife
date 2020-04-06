<template>
    <div class="content-recette" v-if="isLoaded">
        <div class="title">
            <h1>Bolo de censura do Brasil</h1>
            <h3>
                Le gâteau aux carottes du Brésil
                <!-- TODO: grisser / mettre en secondaire -->
            </h3>
        </div>
        <ImageRecette />
        <InfosPratiques :data="recette.infosPratiques" />
        <MaterielConseille />
        <Ingredients :data="recette.ingredients" />
        <Instructions :data="recette.instructions" />
        <Astuces :data="recette.astuces" />
        <Variantes />
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
            recette: {},
        }
    },
    beforeMount() {
        this.recette = this.getRecetteById()
        this.isLoaded = true
    },
    methods: {
        async getRecetteById() {
            await database
                .collection('recettes')
                .get(this.$route.params.id)
                .then(doc => doc.data())
        },
    },
}
</script>

<style scoped>
/* TODO: use Grid or Flex to design correctly */
.content-recette {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}
@media only screen and (max-width: 1024px) {
    /* For mobile phones: */
    .content-recette {
        width: 90%;
    }
}
</style>
