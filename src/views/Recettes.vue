<template>
    <div>
        <h1>Sommaire</h1>
        <div class="recettes" v-if="isLoaded">
            <div
                class="recette"
                v-for="(recette, index) in recettes"
                :key="index"
            >
                <router-link :to="'/recettes/' + recette.id">
                    {{ recette.title }}
                </router-link>
                <div>
                    <ButtonRouter :path="'/recettes/edit/' + recette.id">
                        <Edit />
                    </ButtonRouter>
                    <Button asIcon @click.native="removeRecette(recette.id)">
                        <Remove />
                    </Button>
                </div>
            </div>
            <br />
        </div>
        <ButtonRouter path="recettes/add">
            <Add />
        </ButtonRouter>
        <!-- <Button @click.native="removeAllRecetteSans">suppr all</Button> -->
    </div>
</template>

<script>
import database from '@/firebase/db'
import Button from '@/components/ui/Button'
import ButtonRouter from '@/components/ui/ButtonRouter'
import Edit from '@/components/ui/png/Edit'
import Add from '@/components/ui/png/Add'
import Remove from '@/components/ui/png/Remove'

export default {
    name: 'Recettes',
    components: {
        Button,
        ButtonRouter,
        Edit,
        Add,
        Remove,
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
        removeRecette(id) {
            database
                .collection('recettes')
                .doc(id)
                .delete()
                .then((this.recettes = []))
                .then(this.getSummary())
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
.recette {
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
        font-size: 20px;
    }
}
</style>
