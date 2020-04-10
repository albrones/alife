<template>
    <div>
        <h3><slot /> <span v-if="optionnal">(optionnel)</span></h3>
        <div class="input-link-multiple" v-if="value.length > 0">
            <div class="block">
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
                    :id="name + index + 'Title'"
                />
            </div>
            <div class="block">
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
                    :id="name + index + 'Path'"
                />
            </div>
        </div>
        <Button @click.native="addItem(value)">
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
.input-link-multiple {
    width: 100%;
}
.block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: stretch;
}
input {
    width: 100%;
    border: #42b983 1px solid;
    border-radius: 12px;
    padding: 5px;
    margin-bottom: 8px;
}
</style>
