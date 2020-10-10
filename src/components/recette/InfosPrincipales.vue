<template>
    <div class="title">
        <h1>{{ data.title }}</h1>
        <h3 v-if="data.subtitle !== ''">
            {{ data.subtitle }}
            <!-- TODO: grisser / mettre en secondaire -->
        </h3>
        <h4>{{ date }}</h4>
        <h4 v-if="data.auteur !== ''">by {{ data.auteur }}</h4>
    </div>
</template>

<script>
export default {
    name: 'InfosPrincipales',
    props: {
        data: {
            type: Object,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped></style>
