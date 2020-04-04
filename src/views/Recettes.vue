<template>
    <div>
        <h1>Sommaire</h1>
        <div class="recettes">
            <router-link
                v-for="(recette, index) in recettes"
                :key="index"
                :to="'/recettes/' + recette.id"
            >
                {{ recette.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Recettes',
    data() {
        return {
            recettes: [{ name: 'Bolo de censura do Brasil', id: 'test' }],
        }
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
