<template>
    <div>
        <div class="categories">
            <button
                :class="{
                    active: value.tapas,
                    'only-display': !isEdit,
                    hidden: !isEdit && !value.tapas,
                }"
                @click="switchState('tapas')"
            >
                Tapas
            </button>
            <button
                :class="{
                    active: value.entree,
                    'only-display': !isEdit,
                    hidden: !isEdit && !value.entree,
                }"
                @click="switchState('entree')"
            >
                Entrée
            </button>
            <button
                :class="{
                    active: value.plat,
                    'only-display': !isEdit,
                    hidden: !isEdit && !value.plat,
                }"
                @click="switchState('plat')"
            >
                Plat
            </button>
            <button
                :class="{
                    active: value.dessert,
                    'only-display': !isEdit,
                    hidden: !isEdit && !value.dessert,
                }"
                @click="switchState('dessert')"
            >
                Dessert
            </button>
            <button
                :class="{
                    active: value.cocktail,
                    'only-display': !isEdit,
                    hidden: !isEdit && !value.cocktail,
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
        value: { type: Object, required: true },
        isEdit: { type: Boolean, required: false, default: true },
    },
    methods: {
        switchState(item) {
            if (this.isEdit) {
                this.value[item] = !this.value[item]
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
