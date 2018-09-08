# YouTube Playlist for Vue

This is a simple component, which allows you to display a responsive YouTube iframe embed - with a playlist style sidebar to change between multiple videos.

![Imgur](https://i.imgur.com/CQn9i7S.jpg)

## Install

Add it to your project via `npm i vue-youtube-playlist`

## Usage

Then you can import it into your project however you see fit e.g.

```javascript

import YouTubePlaylist from 'vue-youtube-playlist'

Vue.component('youtube-playlist', YouTubePlaylist);

Vue.component('youtube-playlist', require('vue-youtube-playlist'));

Vue.component('some-component', {
    components: {
        YouTubePlaylist
    }
});

Vue.component('some-component', {
    components: {
        'youtube-playlist': YouTubePlaylist
    }
});

// etc...
```

Once imported you can reference it in your template, the only required property is `videos`

```html
<script>
    const arrayOfVideos = [
        'https://www.youtube.com/watch?v=5bZQzPayuKU',
        'https://www.youtube.com/watch?v=5bZQzPaDKU',
        'https://www.youtube.com/watch?v=5bZQzPayuKU',
    ];
</script>

<youtube-playlist :videos="arrayOfVideos"></youtube-playlist>
```

If your videos do not match the normal youtube dimensions of `640 by 360` you can pass in a custom aspect ratio with `aspect-ratio="100:50"` this will handle the constraints of the responsive functionality. e.g.

```html
<youtube-playlist
    :videos="arrayOfVideos"
    aspect-ratio="100:50"
/>
```

## Configuration

The `videos` prop takes 2 formats, straight strings, or configuration objects.

```js
const arrayOfVideos = [
    'https://www.youtube.com/watch?v=5bZQzPayuKU',
    {
        url: 'https://www.youtube.com/watch?v=5bZQzPayuKU',
        thumbnail: 'https://website.com/custom-thumbnail.jpg',
        config: {
            autoplay: 1,
            color: 'white',
            // You can use any params from https://developers.google.com/youtube/player_parameters#Manual_IFrame_Embeds
        }
    },
    'https://www.youtube.com/watch?v=5bZQzPayuKU',
];
```

The minimum structure for the object notation is:

```js
{
    url: 'youtube',
    config: {
        xx: 'yy',
    }
}
```

## Styling

None of the CSS is scoped locally to the component and has very low specificity making it easy to overwrite, allowing you to customise with ease.

The classes for the player are all prefixed with `ytpl-` for use with things such as PurgeCSS, please browse the source code for full class usage.

We also use PerfectScrollbar for a universal scrolling experience which prefixes it's classes with `ps-` - again for full class reference check the source code. 
