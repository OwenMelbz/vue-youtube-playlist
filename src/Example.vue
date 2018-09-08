<template>
    <div class="app">
        <youtube-playlist aspect-ratio="640:360" :videos="videos"></youtube-playlist>
    </div>
</template>

<script>
    import YoutubePlaylist from '@/components/YouTubePlaylist.vue'

    export default {
        name: 'app',
        components: {YoutubePlaylist},
        data() {
            return {
                videos: [
                    'https://www.youtube.com/watch?v=5bZQzPayuKU',
                    'https://www.youtube.com/watch?v=5bZQzPayu3KU',
                    'https://www.youtube.com/watch?v=5bZQzPayu1KU',
                ],
            }
        }
    }
</script>

<style>
    body {
        margin: 40px;
    }

    .app {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
</style>
