<template>
    <div>
        <h4><slot /> <span v-if="optionnal">(optionnel)</span></h4>
        <div class="input-link-multiple" v-if="value.length > 0">
            <div class="block" v-for="(item, index) in value" :key="index">
                <div>
                    <h5>
                        <label :for="name + 'Title'">
                            Titre
                        </label>
                    </h5>
                    <input
                        v-model="value[index].title"
                        :name="name + 'Title'"
                        :id="name + index + 'Title'"
                    />
                </div>
                <div>
                    <h5>
                        <label :for="name + 'Path'">
                            Lien
                        </label>
                    </h5>
                    <input
                        v-model="value[index].path"
                        :name="name + 'Path'"
                        :id="name + index + 'Path'"
                    />
                </div>
            </div>
        </div>
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
        removeItem(array) {
            array.pop()
        },
    },
}
</script>

<style lang="scss" scoped>
.input-link-multiple {
    width: 100%;
}
.block {
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-grow: 1;
        h5 {
            margin-right: 8px;
        }
    }
    div:nth-child(1) {
        margin-right: 8px;
    }
}
input {
    width: 100%;
    border: #42b983 1px solid;
    border-radius: 12px;
    padding: 5px;
    margin-bottom: 8px;
}
</style>
