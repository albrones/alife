<template>
    <div>
        <h3>Vidéo YouTube:</h3>
        <div class="video">
            <div>
                <a :href="data">{{ data }}</a>
            </div>
            <div class="videoResponsive">
                <iframe
                    width="560"
                    height="349"
                    :src="data"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Video',
    props: {
        data: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped>
.video {
    max-width: 100%;
    margin: 0 16px;
    height: initial;
}
.videoResponsive {
    padding-bottom: 56.25%;
    height: 0;
    position: relative;
    padding-top: 30px;
    overflow: hidden;
}
.videoResponsive iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
