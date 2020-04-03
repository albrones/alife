<template>
    <div>
        <h3>Instuctions:</h3>
        <div class="instructions">
            <p v-for="(instruction, index) in data" :key="index">
                <span>
                    <strong>{{ index + 1 }})</strong>
                </span>
                {{ instruction }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Instructions',
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style scoped>
.instructions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
p {
    text-align: initial;
}
</style>
