<template>
    <button :style="`width: ${width}px; height: ${height}px; background-image: url('${video.thumbnail}')`" ref="button" :class="{'ytpl-active' : video.active}" title="Click to watch" @click="watchVideo" class="ytpl-thumbnail" type="button">
        <div class="ytpl-thumbnail-overlay">
            <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zm24 46L30.8 70.5c-.8-.5-1-.5-1.8-1v-49c.8-.5 1-.5 1.8-1L69 44v2z" :fill="btnColour" fill-rule="nonzero"/></svg>
        </div>
    </button>
</template>

<script>
    import EventBus from './event-bus';
    import { debounce } from './helpers'

    export default {

        name: 'Thumbnail',

        props: ['video', 'btn-colour', 'aspect-ratio'],

        data() {
            return {
                width: 10,
                height: 10,
            }
        },

        mounted() {
            this.$nextTick(() => {
                window.onload = this.resizeThumbnail();
                window.onresize = debounce(() => this.resizeThumbnail(), 10);
            });
        },

        methods: {

            resizeThumbnail() {
                const [ numerator, denominator ] = this.aspectRatio.split(':');
                const ratio = denominator / numerator;

                if (window.innerWidth < 620) {
                    this.width = 160;
                } else {
                    this.width = this.$refs.button.parentElement.getBoundingClientRect().width;
                }

                this.height = this.width * ratio;
            },

            watchVideo() {
                EventBus.$emit('ytpl:play', this.video);
            },

        }

    }
</script>

<style>
    .ytpl-thumbnail {
        -webkit-appearance: none;
        position: relative;
        display: block;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        cursor: pointer;
        background-color: #000;
        background-size: 100% auto;
        background-position: center;
    }

    .ytpl-thumbnail-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0 ,0, .8);
    }

    .ytpl-thumbnail svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: auto;
        height: 30%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity .2s ease;
        pointer-events: none;
    }

    .ytpl-thumbnail:hover svg,
    .ytpl-active svg {
        opacity: 1;
    }

    .ytpl-thumbnail:hover .ytpl-thumbnail-overlay {
        background-color: rgba(0, 0 ,0, .5);
    }

    .ytpl-thumbnail.ytpl-active .ytpl-thumbnail-overlay {
        background-color: rgba(0, 0 ,0, .3);
    }

    @media (max-width: 620px) {
        .ytpl-thumbnail {
            float: left;
        }
    }

</style>
