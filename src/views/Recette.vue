<template>
    <div class="content-recette">
        <div class="title">
            <h1>Titre de recette</h1>
            <h3>
                Sous-titre traduit
                <!-- TODO: grisser / mettre en secondaire -->
            </h3>
        </div>
        <ImageRecette />
        <InfosPratiques />
        <MaterielConseille />
        <Ingredients />
        <Instructions />
        <AstucesVariantes />
        <!-- TODO:
            Autres Photos (galerie)
         -->
    </div>
</template>

<script>
// @ is an alias to /src
import InfosPratiques from '@/components/recette/InfosPratiques'
import MaterielConseille from '@/components/recette/MaterielConseille'
import ImageRecette from '@/components/recette/ImageRecette'
import Ingredients from '@/components/recette/Ingredients'
import Instructions from '@/components/recette/Instructions'
import AstucesVariantes from '@/components/recette/AstucesVariantes'
export default {
    name: 'Recette',
    components: {
        InfosPratiques,
        MaterielConseille,
        ImageRecette,
        Ingredients,
        Instructions,
        AstucesVariantes,
    },
}
</script>

<style scoped>
/* TODO: use Grid or Flex to design correctly */
.content-recette {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* align-content: center; */
    width: 80%;
    margin: 0 auto;
}
.title {
    /* align-self: flex-start; */
}
.infos-pratiques {
    align-self: flex-start;
}
.image {
    /* align-self: flex-start; */
}
.materiel-conseille {
    align-self: flex-start;
}
.ingredients {
    align-self: flex-start;
}
.instructions {
    align-self: flex-start;
}
.astuces-variantes {
    /* align-self: flex-start; */
}
</style>
