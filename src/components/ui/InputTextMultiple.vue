<template>
    <div class="input-text-multiple">
        <h4>
            <label :for="name">
                <slot /> <span v-if="optionnal">(optionnel)</span>
            </label>
        </h4>
        <textarea
            v-for="(item, index) in value"
            :key="index"
            v-model="value[index]"
            :name="name"
            :id="name + index"
            rows="1"
        />
        <div>
            <Button @click.native="addItem(value)">
                +
            </Button>
            <Button @click.native="removeItem(value)">
                -
            </Button>
        </div>
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
        removeItem(array) {
            array.pop()
        },
    },
}
</script>

<style lang="scss" scoped>
.input-text-multiple {
    width: 100%;
}
textarea {
    width: 100%;
    border: #42b983 1px solid;
    border-radius: 12px;
    padding: 5px;
    margin-bottom: 8px;
    overflow: auto;
}
</style>
