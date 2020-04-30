<template>
    <div>
        <h1>Recettes</h1>
        <div class="recettes" v-if="isLoaded">
            <InputSearch class="input-search" v-model="searchValue" />
            <Categories :value="categories" />
            <div
                class="recette"
                v-for="(recette, index) in recettes"
                :key="index"
            >
                <router-link :to="'/recettes/' + recette.id">
                    {{ recette.infosPrincipales.title }}
                </router-link>
                <div class="actions">
                    <ButtonRouter :path="'/recettes/edit/' + recette.id">
                        <Edit />
                    </ButtonRouter>
                    <Button asIcon @click.native="showModal(recette)">
                        <Remove />
                    </Button>
                </div>
            </div>
            <br />
        </div>
        <ButtonRouter path="recettes/add">
            <Add />
        </ButtonRouter>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            @action="removeRecette"
            :title="modalRecetteTitle"
        />
    </div>
</template>

<script>
import database from '@/firebase/db'
import Button from '@/components/ui/Button'
import ButtonRouter from '@/components/ui/ButtonRouter'
import Edit from '@/components/ui/png/Edit'
import Add from '@/components/ui/png/Add'
import Remove from '@/components/ui/png/Remove'
import Modal from '@/components/ui/Modal'
import InputSearch from '@/components/ui/InputSearch'
import Categories from '@/components/recette/Categories'

export default {
    name: 'Recettes',
    components: {
        Button,
        ButtonRouter,
        Edit,
        Add,
        Remove,
        Modal,
        InputSearch,
        Categories,
    },
    data() {
        return {
            isLoaded: false,
            recettes: [],
            recettesLoaded: [],
            isModalVisible: false,
            idRecetteToRemove: null,
            modalRecetteTitle: '',
            searchValue: '',
            categories: [],
        }
    },
    async created() {
        await this.getSummary()
        this.isLoaded = true
    },
    watch: {
        searchValue(value) {
            this.filterRecettes(value)
        },
        categories() {
            this.filterRecettes('')
        },
    },
    methods: {
        async getSummary() {
            // TODO: Export db usage in store ???
            await database
                .collection('recettes')
                .get()
                .then(list => {
                    this.recettes = []
                    list.forEach(recette =>
                        this.recettes.push({
                            infosPrincipales: recette.get('infosPrincipales'),
                            id: recette.id,
                            categories: recette.get('categories'),
                        })
                    )
                    this.orderAlphabetical()
                })
                .then(() => (this.recettesLoaded = this.recettes))
        },
        removeRecette() {
            database
                .collection('recettes')
                .doc(this.idRecetteToRemove)
                .delete()
                .then((this.recettes = []))
                .then(this.closeModal)
                .then(this.getSummary())
        },
        showModal(recette) {
            this.isModalVisible = true
            const { id, infosPrincipales } = recette
            this.idRecetteToRemove = id
            this.modalRecetteTitle = infosPrincipales.title
        },
        closeModal() {
            this.isModalVisible = false
            this.idRecetteToRemove = null
            this.modalRecetteTitle = null
        },
        filterRecettes(value) {
            if (this.recettesLoaded.length > 0)
                this.recettes = this.recettesLoaded.filter(recette =>
                    recette.infosPrincipales.title.includes(value) &&
                    this.categories.length > 0
                        ? this.categories.some(categorie =>
                              recette.categories.includes(categorie)
                          )
                        : true
                )
        },
        orderAlphabetical() {
            this.recettes.sort()
        },
    },
}
</script>

<style lang="scss" scoped>
.recettes {
    margin: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.recette {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 16px 16px 16px;
    a {
        font-size: 20px;
        font-weight: bold;
        color: #2c3e50;
        flex-grow: 1;
        flex-shrink: 1;
        margin-right: 16px;
        display: flex;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
    .actions {
        flex-grow: 0;
        flex-shrink: 0;
    }
}
.input-search {
    max-width: 500px;
    margin: auto;
    margin-bottom: 32px;
}
</style>
