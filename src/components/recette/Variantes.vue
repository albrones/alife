<template>
    <div>
        <h3>Variantes:</h3>
        <div class="variantes">
            <div>
                <router-link to="">Variante 1</router-link> |
                <router-link to="">Variante 2</router-link> |
                <router-link to="">Variante 3</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Variantes',
}
</script>

<style scoped>
.variantes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
