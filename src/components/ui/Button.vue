<template>
    <button><slot /></button>
</template>

<script>
export default {
    name: 'Button',
    props: {},
}
</script>

<style scoped>
button {
    min-width: 80px;
    min-height: 30px;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #42b983;
}
</style>
