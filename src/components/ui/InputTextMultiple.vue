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
            :id="name + index"
        />
        <Button @click.native="addItem(value)">
            Ajouter
        </Button>
    </div>
</template>

<script>
import Button from '@/components/ui/Button'

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
    components: {
        Button,
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
