<template>
    <button :class="{ 'as-text': !asIcon, 'as-icon': asIcon }"><slot /></button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        asIcon: {
            type: Boolean,
        },
    },
}
</script>

<style scoped>
.as-text {
    min-width: 80px;
    min-height: 30px;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #42b983;
}
.as-icon {
    border-radius: 30px;
    border: #42b983 solid 1px;
    background-color: white;
    height: 50px;
    width: 50px;
    padding: 1px 9px 1px 7px;
    margin-left: 5px;
}
</style>
