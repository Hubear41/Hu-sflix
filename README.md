# README

[Hu'sflix Live Site](https://hu-sflix.herokuapp.com/)

# Hu'sflix 

Hu'sflix is a media streaming service inspired by Netflix where movies are separated into rows. It uses Rails/Postgresql backend that interacts with a React/Redux frontend and pulls videos and images from AWS.

This webservice was built in 10 days. Bug fixes and refactors are on the way.

# Overview

* Secure frontend to backend user authentication using BCrypt.
* On login, users is greeted with a trailer from an available show.
* Users can hover over movie thumbnails to watch a trailer of the movie.
* On click of a thumbnail, User is brought to a watch page where the movie data is then played.
* The watch page can be played in a browser window or fullscreen.

# Features

## Dynamic Video Header

* The Video Header in the show browse can alternate through a poster or a video player automatically.

![](./docs/images/husflix-video-header-img.png)

* On page load, the poster is shown until the video hits the event `canPlayThrough`. The `canPlayThrough` event fires a function that plays the video as well as hides the poster. The video is muted by default but can be toggled with a button next to the maturity rating

## Dynamic Video Thumbnails

*  When the mouse hovers over a thumbnail, the image both dynammically grows and fires a function to play the video. The hover effects are on a delay so that a quick hover over the image doesn't start several videos. If the mouse leaves the thumbnail before it plays, it prevents the video from playing/loading.

![](./docs/images/husflix-dynamic-thumbnail-img.png)

* The hover effect is created using a combination of React refs and HTML media attributes. The thumbnail listens for a `mouseover` event to have it run playVideo(), which creates a setTimeout that will play the video and update state after a 2 seconds.

* The thumbnail also listens for a `mouseleave` event that will run pauseVideo() that clears the timer or pause the video if it had been playing.

`   playVideo() {
        const videoEl = this.videoPlayer.current;
        
        this.videoTimeout = setTimeout( () => {
            videoEl.play();
            
            this.setState({ paused: false });
        }, 2000)
    }

    pauseVideo() {
        const videoEl = this.videoPlayer.current;

        videoEl.pause();
        clearTimeout(this.videoTimeout);

        this.setState({ paused: true });
    } `