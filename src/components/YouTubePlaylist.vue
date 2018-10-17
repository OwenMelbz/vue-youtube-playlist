<template>
    <div class="ytpl-container">

        <div class="ytpl-player" :class="{'ytpl-full' : playlist.length === 1}" ref="player">
            <video-item v-if="active" :video="active" :width="width" :height="height"></video-item>
        </div>

        <div v-if="playlist.length > 1" ref="scrollarea" class="ytpl-playlist" :style="`height: ${playlistHeight};`">
            <div class="ytpl-scrollable-content" :style="`width: ${playlistWidth}`">
                <thumbnail-item @play="setActiveVideo" v-for="video in playlist" :video="video" :key="video.id" :aspect-ratio="aspectRatio" :btn-colour="btnColour"></thumbnail-item>
            </div>
        </div>

    </div>
</template>

<script>

    import { parseVideo, debounce } from './helpers';
    import VideoItem from './Video.vue';
    import ThumbnailItem from './Thumbnail.vue';
    import PerfectScrollbar from 'perfect-scrollbar';

    export default {

        name: 'YouTubePlaylist',

        props: {

            videos: {
                type: [Array],
                required: true,
            },

            btnColour: {
                type: String,
                default: '#fff',
            },

            aspectRatio: {
                type: String,
                default: '640:360',
            },

        },

        components: {
            VideoItem,
            ThumbnailItem,
        },

        data() {
            return {
                playlist: [],
                width: 640,
                height: 360,
                windowWidth: window.innerWidth,
                scrollbar: null,
            }
        },

        beforeMount() {
            this.videos.forEach(video => {
                this.playlist.push(
                    parseVideo(video)
                );
            });

            [this.width, this.height] = this.aspectRatio.split(':');
        },

        mounted() {
            this.playlist[0].active = true;

            this.$nextTick(() => {
                window.onload = this.resizeVideo();
                window.onresize = debounce(() => this.resizeVideo(), 70);
            });

            if (this.$refs.scrollarea) {
                this.scrollbar = new PerfectScrollbar(this.$refs.scrollarea);
                setInterval(() => this.scrollbar.update(), 10000);
            }
        },

        destroyed() {
            if (this.scrollbar) {
                this.scrollbar.destroy();
                this.scrollbar = null;
            }
        },

        methods: {

            setActiveVideo(video) {
                this.active.active = false;
                video.active = true;
            },

            resizeVideo() {
                this.windowWidth = window.innerWidth;

                if (this.scrollbar) {
                    this.scrollbar.update();
                }

                const ratio = this.height / this.width;
                this.width = this.$refs.player.getBoundingClientRect().width;
                this.height = this.width * ratio;
            },

        },

        computed: {

            active() {
                return this.playlist.find(video => video.active);
            },

            playlistHeight() {
                if (this.windowWidth > 620) {
                    return this.height + 'px';
                }

                return 'auto';
            },

            playlistWidth() {
                if (this.windowWidth > 620) {
                    return '100%';
                }

                return (this.playlist.length * 160) + 'px';
            },

        }

    }
</script>

<style>
    .ytpl-container {
        clear: both;
    }

    .ytpl-playlist {
        position: relative;
        overflow: hidden;
        background: #000;
    }

    .ytpl-player {
        background: #000;
    }

    @media (min-width: 620px) {
        .ytpl-container > div {
            float: left;
        }

        .ytpl-player{
            width: calc(100% - 160px);
        }

        .ytpl-full {
            width: 100%;
        }

        .ytpl-playlist {
            width: 160px;
        }
    }

    /*
    * Container style
    */
    .ps {
        overflow: hidden !important;
        overflow-anchor: none;
        -ms-overflow-style: none;
        touch-action: auto;
        -ms-touch-action: auto;
    }

    /*
     * Scrollbar rail styles
     */
    .ps__rail-x {
        display: none;
        opacity: 0;
        transition: background-color .2s linear, opacity .2s linear;
        -webkit-transition: background-color .2s linear, opacity .2s linear;
        height: 15px;
        /* there must be 'bottom' or 'top' for ps__rail-x */
        bottom: 0px;
        /* please don't change 'position' */
        position: absolute;
    }

    .ps__rail-y {
        display: none;
        opacity: 0;
        transition: background-color .2s linear, opacity .2s linear;
        -webkit-transition: background-color .2s linear, opacity .2s linear;
        width: 15px;
        /* there must be 'right' or 'left' for ps__rail-y */
        right: 0;
        /* please don't change 'position' */
        position: absolute;
    }

    .ps--active-x > .ps__rail-x,
    .ps--active-y > .ps__rail-y {
        display: block;
        background-color: transparent;
    }

    .ps:hover > .ps__rail-x,
    .ps:hover > .ps__rail-y,
    .ps--focus > .ps__rail-x,
    .ps--focus > .ps__rail-y,
    .ps--scrolling-x > .ps__rail-x,
    .ps--scrolling-y > .ps__rail-y {
        opacity: 0.6;
    }

    .ps .ps__rail-x:hover,
    .ps .ps__rail-y:hover,
    .ps .ps__rail-x:focus,
    .ps .ps__rail-y:focus,
    .ps .ps__rail-x.ps--clicking,
    .ps .ps__rail-y.ps--clicking {
        background-color: #eee;
        opacity: 0.9;
    }

    /*
     * Scrollbar thumb styles
     */
    .ps__thumb-x {
        background-color: #aaa;
        border-radius: 6px;
        transition: background-color .2s linear, height .2s ease-in-out;
        -webkit-transition: background-color .2s linear, height .2s ease-in-out;
        height: 6px;
        /* there must be 'bottom' for ps__thumb-x */
        bottom: 2px;
        /* please don't change 'position' */
        position: absolute;
    }

    .ps__thumb-y {
        background-color: #aaa;
        border-radius: 6px;
        transition: background-color .2s linear, width .2s ease-in-out;
        -webkit-transition: background-color .2s linear, width .2s ease-in-out;
        width: 6px;
        /* there must be 'right' for ps__thumb-y */
        right: 2px;
        /* please don't change 'position' */
        position: absolute;
    }

    .ps__rail-x:hover > .ps__thumb-x,
    .ps__rail-x:focus > .ps__thumb-x,
    .ps__rail-x.ps--clicking .ps__thumb-x {
        background-color: #999;
        height: 11px;
    }

    .ps__rail-y:hover > .ps__thumb-y,
    .ps__rail-y:focus > .ps__thumb-y,
    .ps__rail-y.ps--clicking .ps__thumb-y {
        background-color: #999;
        width: 11px;
    }

    /* MS supports */
    @supports (-ms-overflow-style: none) {
        .ps {
            overflow: auto !important;
        }
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .ps {
            overflow: auto !important;
        }
    }
</style>
