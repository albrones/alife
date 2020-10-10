<template>
    <router-link class="button-router" tag="button" :to="path">
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'ButtonRouter',
    props: {
        path: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped>
.button-router {
    /* font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 800;
    border-radius: 16px;
    border: #42b983 solid 1px; */

    border-radius: 30px;
    border: #42b983 solid 1px;
    background-color: #fcfefd;
    height: 50px;
    width: 50px;
    padding: 1px 9px 1px 7px;
    margin-left: 5px;

    box-shadow: -1px 2px 1px 0px #6b6b6b;
    outline: none;
}
</style>
