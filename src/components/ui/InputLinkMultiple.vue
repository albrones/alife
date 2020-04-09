<template>
    <div>
        <h3><slot /> <span v-if="optionnal">(optionnel)</span></h3>
        <div v-if="value.length > 0">
            <div>
                <h4>
                    <label :for="name + 'Title'">
                        Titre
                    </label>
                </h4>
                <input
                    v-for="(item, index) in value"
                    :key="index"
                    v-model="value[index].title"
                    :name="name + 'Title'"
                    :id="name + 'Title'"
                />
            </div>
            <div>
                <h4>
                    <label :for="name + 'Path'">
                        Lien
                    </label>
                </h4>
                <input
                    v-for="(item, index) in value"
                    :key="index"
                    v-model="value[index].path"
                    :name="name + 'Path'"
                    :id="name + 'Path'"
                />
            </div>
        </div>
        <Button @click.native="addItem()">
            Ajouter
        </Button>
    </div>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
    name: 'InputTextMultipleDouble',
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
            array.push({ title: '', path: '' })
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    text-transform: capitalize;
}
</style>
