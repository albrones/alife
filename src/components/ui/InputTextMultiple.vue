<template>
    <div>
        <h4>
            <label :for="name">
                <slot /> <span v-if="optionnal">(optionnel)</span>
            </label>
        </h4>
        <input
            v-for="(item, index) in value"
            :key="index"
            v-model="value[index]"
            :name="name"
            :id="name"
        />
        <button @click="addItem(value)">
            Ajouter
        </button>
    </div>
</template>

<script>
export default {
    name: 'InputTextMultiple',
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Array,
            required: true,
        },
        optionnal: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        addItem(array) {
            array.push('')
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    text-transform: capitalize;
}
</style>
