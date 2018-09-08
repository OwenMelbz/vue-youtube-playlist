<template>
    <iframe
        :id="`yt-${video.id}`"
        :src="url"
        class="ytpl-iframe"
        type="text/html"
        :width="width"
        :height="height"
        frameborder="0"
    ></iframe>
</template>

<script>
    import URL from 'url-parse';

    export default {
        name: 'Video',

        props: ['video', 'width', 'height'],

        computed: {
            url() {
                const url = new URL(this.video.url, true);
                url.query = this.video.config;

                return url.toString();
            }
        },

    }
</script>

<style>
    .ytpl-iframe {
        display: block;
        margin: 0;
        padding: 0;
        transition: all;
    }
</style>
