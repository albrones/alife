<template>
    <div>
        <h4>
            <label :for="name">
                {{ label }}
                <span v-if="optionnal"> (optionnal)</span>
            </label>
        </h4>
        <input v-model="value" :name="name" :id="name" />
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        optionnal: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    text-transform: capitalize;
}
</style>
