<template>
    <div class="ingredients">
        <div>
            <h4>Ingrédients:</h4>
            <ul>
                <li v-for="(ingredient, index) in data.principaux" :key="index">
                    <span>{{ ingredient }}</span>
                </li>
            </ul>
        </div>
        <div v-if="data.secondaire">
            <h4>{{ data.secondaire.title }}</h4>
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

<style></style>
