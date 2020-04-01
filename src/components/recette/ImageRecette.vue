<template>
    <div class="image">
        <!-- TODO: Blur image foreground ? Crop automatic ? -->
        <img
            src="https://qph.fs.quoracdn.net/main-qimg-2ace80b379865482e878cb6aca57512d"
            alt="le gateau"
            style="width:500px"
        />
    </div>
</template>

<script>
export default {
    name: 'ImageRecette',
}
</script>

<style scoped>
.image {
    position: absolute;
    top: 250px;
    right: 320px;
}
</style>
