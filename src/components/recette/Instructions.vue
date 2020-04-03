<template>
    <div class="instructions">
        <h4>Instuctions:</h4>
        <p v-for="(instruction, index) in data" :key="index">
            <span>
                <strong>{{ index + 1 }})</strong>
            </span>
            {{ instruction }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'Instructions',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style></style>
