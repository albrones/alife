<template>
    <div v-if="data.length > 0">
        <h3>Variantes:</h3>
        <div class="variantes">
            <div>
                <router-link
                    v-for="(variante, index) in data"
                    :key="index"
                    :to="variante.path"
                    >{{ variante.title }}</router-link
                >
                |
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Variantes',
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style scoped>
.variantes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
