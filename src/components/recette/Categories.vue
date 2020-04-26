<template>
    <div>
        <div class="categories">
            <button
                :class="{
                    active: hasValue('tapas'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('tapas'),
                }"
                @click="switchState('tapas')"
            >
                Tapas
            </button>
            <button
                :class="{
                    active: hasValue('entree'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('entree'),
                }"
                @click="switchState('entree')"
            >
                Entrée
            </button>
            <button
                :class="{
                    active: hasValue('plat'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('plat'),
                }"
                @click="switchState('plat')"
            >
                Plat
            </button>
            <button
                :class="{
                    active: hasValue('dessert'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('dessert'),
                }"
                @click="switchState('dessert')"
            >
                Dessert
            </button>
            <button
                :class="{
                    active: hasValue('cocktail'),
                    'only-display': isDisplay,
                    hidden: isDisplay && !hasValue('cocktail'),
                }"
                @click="switchState('cocktail')"
            >
                Cocktail
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: { type: Array, required: true },
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
