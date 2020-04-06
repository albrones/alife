<template>
    <div class="content-recette">
        <div class="title">
            <h1>Bolo de censura do Brasil</h1>
            <h3>
                Le gâteau aux carottes du Brésil
                <!-- TODO: grisser / mettre en secondaire -->
            </h3>
        </div>
        <ImageRecette />
        <InfosPratiques :data="infosPratiques" />
        <MaterielConseille />
        <Ingredients :data="ingredients" />
        <Instructions :data="instructions" />
        <Astuces :data="astuces" />
        <Variantes />
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
        /* TODO: get & dispatch data dynamicaly using $route.params.id , test integrating one more recipe*/
        return {
            infosPratiques: {
                preparation: 'xxx',
                repos: 'xxx',
                cuisson: '200°C - en surveillant',
            },
            ingredients: {
                principaux: [
                    '3 carottes moyennes',
                    '5 oeufs',
                    '1/2 à 3/4 de tasse d’huile',
                    '2 tasses de sucre',
                    '3 tasses de farine',
                    '1 sachet de levure',
                    '1 pincée de sel',
                ],
                secondaire: {
                    title: 'Pour la couverture de chocolat',
                    data: [
                        '1 tasse de chocolat en poudre',
                        '1/2 tasse de lait',
                    ],
                },
            },
            instructions: [
                'Couper les carottes en rondelles et le mixer avec les oeufs, le sucre et l’huile.',
                'Dans une terrine, mélanger la marie, la levure et le sel.',
                'Ajouter le mélange aux carottes dans la terrine et tout mélanger.',
                'Beurrer un moule rectangulaire, le saupoudrer de farine et y verser la pâte.',
                'Faire cuire à 200°C en surveillant.',
                'Une fois le gâteau cuit (la page ne doit pas coller à pointe du couteau), préparer la couverture de chocolat.',
                'Mélanger dans une casserole, à feu moyen, le chocolat en poudre et le lait, jusqu’à ce que le mélange épaississe.',
                'Verser la couverture de chocolat sur le gâteau et laisser refroidir.',
            ],
            astuces: [
                'Ne pas couvrir le gâteau car la couverture est collante ! A manger froid ou frais.',
            ],
        }
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
