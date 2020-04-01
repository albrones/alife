<template>
    <div class="article">
        <h1>Titre de recette</h1>
        <h3>
            Sous-titre traduit
            <!-- TODO: grisser / mettre en secondaire -->
        </h3>
        <div class="content-recette">
            <InfosPratiques />

            <MaterielConseille />

            <ImageRecette />

            <Ingredients />

            <Instructions />

            <AstucesVariantes />
            <!-- TODO:
            Autres Photos (galerie)
         -->
        </div>
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
.content-recette {
    text-align: initial;
    margin: 0 300px 40px 300px;
}
</style>
