<template>
    <div v-if="data.length > 0">
        <h3>Matériel conseillé:</h3>
        <div class="materiel-conseille">
            <ul>
                <li v-for="(materiel, index) in data" :key="index">
                    <span> {{ materiel }} </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaterielConseille',
    props: {
        data: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
}
</script>

<style scoped>
.materiel-conseille {
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
