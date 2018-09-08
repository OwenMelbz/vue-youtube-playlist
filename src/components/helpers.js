import URL from 'url-parse';

export function parseVideo(video) {
    let config = {
        thumbnail: null,
        id: null,
        url: null,
        active: false,
        config: {
            start: 0
        },
    };

    if (typeof video === 'string') {
        config.url = video;
    } else {
        config.url = video.url;
        config.config = Object.assign(config.config, video.config);
    }

    config.config = Object.assign(
        config.config,
        new URL(config.url, true).query
    );

    config.id = getVideoId(config.url);
    config.url = 'https://www.youtube.com/embed/' + config.id;
    config.thumbnail = 'https://img.youtube.com/vi/' + config.id + '/0.jpg';

    if (config.config.thumbnail) {
        config.thumbnail = config.config.thumbnail;
    }

    return config;
}

export function getVideoId(url){
    let parts = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (parts[2] !== undefined) {
        parts = parts[2].split(/[^0-9a-z_\-]/i);
        return parts[0];
    }

    return parts;
};

export function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this, args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);

        if (immediate && !timeout) {
            func.apply(context, args);
        }
    }
}
