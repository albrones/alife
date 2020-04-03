<template>
    <div class="image">
        <!-- TODO: Blur image foreground ? Crop automatic ? -->
        <!-- TODO: Add default image or make optional -->
        <img
            src="https://qph.fs.quoracdn.net/main-qimg-2ace80b379865482e878cb6aca57512d"
            alt="le gateau"
        />
    </div>
</template>

<script>
export default {
    name: 'ImageRecette',
}
</script>

<style scoped>
img {
    width: 300px;
}
</style>
