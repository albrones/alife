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
        </div>
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

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
