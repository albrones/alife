<template>
    <div>
        <div class="categories">
            <Button
                :class="{
                    active: hasValue('base'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('base'),
                }"
                @click.native="switchState('base')"
            >
                Base
            </Button>
            <Button
                :class="{
                    active: hasValue('tapas'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('tapas'),
                }"
                @click.native="switchState('tapas')"
            >
                Tapas
            </Button>
            <Button
                :class="{
                    active: hasValue('entree'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('entree'),
                }"
                @click.native="switchState('entree')"
            >
                Entrée
            </Button>
            <Button
                :class="{
                    active: hasValue('plat'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('plat'),
                }"
                @click.native="switchState('plat')"
            >
                Plat
            </Button>
            <Button
                :class="{
                    active: hasValue('dessert'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('dessert'),
                }"
                @click.native="switchState('dessert')"
            >
                Dessert
            </Button>
            <Button
                :class="{
                    active: hasValue('boisson'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('boisson'),
                }"
                @click.native="switchState('boisson')"
            >
                Boisson
            </Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
    components: {
        Button,
    },
    props: {
        value: { type: Array, required: false, default: () => [] },
        isDisplay: { type: Boolean, required: false, default: false },
    },
    methods: {
        hasValue(item) {
            return this.value.includes(item)
        },
        switchState(item) {
            if (!this.isDisplay) {
                const indexNewValue = this.value.indexOf(item)
                if (indexNewValue !== -1) {
                    this.value.splice(indexNewValue, 1)
                } else {
                    this.value.push(item)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.categories {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 16px;
    button {
        margin: 8px 8px;
    }
}
button {
    min-width: 80px;
    min-height: 30px;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #42b983;
    margin: 8px auto;
}
.active {
    color: white;
    background-color: #42b983;
}
.only-display {
    outline: none;
    border-style: outset;
}
.hidden {
    display: none;
}
</style>
