<template>
    <div>
        <h1>Sommaire</h1>
        <div class="recettes" v-if="isLoaded">
            <div v-for="(recette, index) in recettes" :key="index">
                <router-link :to="'/recettes/' + recette.id">
                    {{ recette.title }}
                </router-link>
                <router-link :to="'/recettes/edit/' + recette.id">
                    Edit {{ recette.id }}
                </router-link>
                <Button @click.native="removeRecette(recette.id)">
                    Suppr.
                </Button>
            </div>
            <br />
        </div>
        <router-link tag="button" to="add" append>Ajouter recette</router-link>
        <!-- <Button @click.native="removeAllRecetteSans">suppr all</Button> -->
    </div>
</template>

<script>
import database from '@/firebase/db'
import Button from '@/components/ui/Button'

export default {
    name: 'Recettes',
    components: {
        Button,
    },
    data() {
        return {
            isLoaded: false,
            recettes: [],
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
        async removeRecette(id) {
            await database
                .collection('recettes')
                .doc(id)
                .delete()
        },
        // async removeAllRecetteSans() {
        //     this.recettes.forEach(async recette => {
        //         await database
        //             .collection('recettes')
        //             .doc(recette.id)
        //             .delete()
        //     })
        // },
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
