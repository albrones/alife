<template>
    <div class="astuces">
        <h4>ASTUCES:</h4>
        <div v-for="(astuce, index) in data" :key="index">
            {{ astuce }}
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

<style></style>
