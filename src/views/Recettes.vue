<template>
    <div>
        <h1>Sommaire</h1>
        <div class="recettes" v-if="isLoaded">
            <router-link
                v-for="(recette, index) in recettes"
                :key="index"
                :to="'/recettes/' + recette.id"
            >
                {{ recette.title }}
            </router-link>
            <br />
        </div>
        <router-link tag="button" to="add" append>+</router-link>
    </div>
</template>

<script>
import database from '@/firebase/db'
export default {
    name: 'Recettes',
    data() {
        return {
            isLoaded: false,
            recettes: [],
            dataRecette: {
                title: 'Tapenade de tomates séchées',
                subtitle: '',
                images: [],
                infosPratiques: {
                    preparation: '15min',
                    repos: '',
                    cuisson: 'pas de cuisson',
                },
                materielConseille: [],
                ingredients: {
                    principaux: [
                        'pour un pot de 150g environ',
                        '120g de tomates séchées et confites (pour de stomates séchées maison voir dans la rubrique 4)',
                        '100g d’olives vertes dénoyautées',
                        '2 c.S. de cadres vinaigrées (option)',
                        '1/2 jus de citron',
                        '1 trait de vinaigre balsamique',
                        'de l’huile d’olive',
                        '1 gousse d’ail hachée',
                        '2 c.S. de pignons de pin',
                        'des feuilles de basilique ou d’herbes de provence',
                    ],
                    secondaires: {},
                },
                instructions: [
                    'Mixer tous les ingrédients finement.',
                    'Ajuster l’assaisonnement au goût.',
                    'A consommer frais sur des tartines de pain.',
                ],
                astuces: [],
                variantes: [],
            },
        }
    },
    mounted() {
        this.getSummary()
        this.isLoaded = true
    },
    methods: {
        async getSummary() {
            // TODO: Export db usage in store ???
            await database
                .collection('recettes')
                .get()
                .then(list => {
                    list.forEach(recette =>
                        this.recettes.push({
                            title: recette.get('title'),
                            id: recette.id,
                        })
                    )
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.recettes {
    padding: 30px;
    display: flex;
    flex-direction: column;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
