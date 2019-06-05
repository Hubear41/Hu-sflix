import React from 'react'

class BigPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: true,
            imageOpacity: 1,
        };
        this.videoPlayer = React.createRef();
        this.poster = React.createRef();
        this.startVideo = this.startVideo.bind(this);
        this.videoEnded = this.videoEnded.bind(this);
    }
    
    componentDidMount() {
        const { previewId } = this.props;
        
        this.props.requestVideo(previewId);
    }

    toggleMute() {
        const videoEl = this.videoPlayer.current;

        if ( videoEl.muted ) {
            videoEl.muted = false;
            this.setState({ muted: false });
        } else {
            videoEl.muted = true;
            this.setState({ muted: true });
        }
    }

    startVideo() {
        const videoEl = this.videoPlayer.current;
        
        setTimeout( () => {
            videoEl.play();
            this.setState({ imageOpacity: 0 });
        }, 2000);
    }

    videoEnded() {
        this.setState({ imageOpacity: 1});
    }
    
    render() {
        const { show, video } = this.props;
        const { imageOpacity } = this.state;
        
        return (
            <figure className="big-video-preview-wrapper">
                <img src={show && show.posterUrl ? show.posterUrl : window.tempBgURL} 
                     className="big-video-poster"
                     style={{ opacity: imageOpacity === 0  }}
                     ref={this.poster}
                ></img>

                <section className="video-el-wrapper">
                    <figure className="big-video-bg"></figure>
                    <video  controls={true}
                            autoPlay
                            muted
                            className="big-video"
                            ref={this.videoPlayer}
                            onCanPlay={this.startVideo}
                            onEnded={this.videoEnded}
                    >
                        { video && video.videoUrl ? <source src={video.videoUrl} type="video/mp4" /> : null }
                    </video>
                </section>
                <article className="big-preview-description">

                </article>
            </figure>
        );
    }
}

export default BigPreview;