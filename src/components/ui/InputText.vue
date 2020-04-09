<template>
    <div>
        <h4>
            <label :for="name">
                <slot />
                <span v-if="optionnal"> (optionnel)</span>
            </label>
        </h4>
        <input v-model="valueModel" :name="name" :id="name" />
    </div>
</template>

<script>
export default {
    name: 'InputText',
    props: {
        name: {
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
    computed: {
        valueModel: {
            get: function() {
                return this.value
            },
            set: function(val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    text-transform: capitalize;
}
</style>
