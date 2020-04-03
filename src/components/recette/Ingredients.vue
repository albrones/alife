<template>
    <div>
        <h3>Ingrédients:</h3>
        <div class="ingredients">
            <ul>
                <li v-for="(ingredient, index) in data.principaux" :key="index">
                    <span>{{ ingredient }}</span>
                </li>
            </ul>
        </div>
        <h3>{{ data.secondaire.title }}</h3>
        <div class="ingredients" v-if="data.secondaire">
            <ul>
                <li
                    v-for="(ingredient, index) in data.secondaire.data"
                    :key="index"
                >
                    <span>{{ ingredient }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ingredients',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.ingredients {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
li {
    text-align: initial;
}
li > span {
    margin-left: 20px;
}
</style>
