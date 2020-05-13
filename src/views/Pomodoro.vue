<template>
    <div class="music">
        <h1>Pomodoro</h1>
        <div class="pomodoro" v-if="isLoaded"></div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Music',
    components: {},
    data() {
        return {
            isLoaded: false,
        }
    },
    mounted() {
        this.isLoaded = true
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.pomodoro {
    margin: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
