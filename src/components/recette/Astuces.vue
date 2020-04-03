<template>
    <div>
        <h3>Astuces:</h3>
        <div class="astuces">
            <div v-for="(astuce, index) in data" :key="index">
                {{ astuce }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Astuces',
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style scoped>
.astuces {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
