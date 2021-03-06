# README

[Hu'sflix Live Site](https://hu-sflix.herokuapp.com/)

# Hu'sflix 

Hu'sflix is a media streaming service inspired by Netflix where movies are categorized by rows. It uses Rails/Postgresql as it's backend that interacts with a React/Redux frontend. The site is hosted on Heroku and media assets are hosted on AWS.

This webservice was built in 10 days. Bug fixes and refactors are on the way.

# Overview

* Secure frontend to backend user authentication using BCrypt.
* On login, users are greeted with a trailer from an available show.
* Users can hover over movie thumbnails to watch a trailer of the movie.
* On click of a thumbnail, User is brought to a watch page where the movie data is then played.
* The watch page can be played in a browser window or fullscreen.

# Features

## Dynamic Video Header

* The Video Header in the show browse can alternate through a poster or a video player automatically.

![](https://media.giphy.com/media/mBLOB5bTCqUg5SpRyY/giphy.gif)

* On page load, the poster is shown until the video hits the event `canPlayThrough`. The `canPlayThrough` event fires a function that plays the video as well as hides the poster. The video is muted by default but can be toggled with a button next to the maturity rating

## Dynamic Video Thumbnails

*  When the mouse hovers over a thumbnail, the image both dynammically grows and fires a function to play the video. The hover effects are on a delay so that a quick hover over the image doesn't start several videos. If the mouse leaves the thumbnail before it plays, it prevents the video from playing/loading.

![](https://media.giphy.com/media/h4BHTfZ59INTbK46GA/giphy.gif)

* The hover effect is created using a combination of React refs and HTML media attributes. The thumbnail listens for a `mouseover` event to have it run `playVideo()`, which creates a setTimeout that will play the video and update state after a 2 seconds. The 2 second timer helps prevent videos from playing when the mouse is just passing by.

* The thumbnail also listens for a `mouseleave` event that will run `pauseVideo()` that clears the timer or pause the video if it had been playing.

```JS
playVideo() {
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
} 
```

# Future Features

* Genre-lists
* Search
* Profiles
* Rating
* Next Show
* Row Dropdown Preview
