import React from 'react'

class BigPreview extends React.Component {
    constructor(props) {
        super(props);
        this.videoPlayer = React.createRef();
    }
    
    componentDidMount() {
        const { show } = this.props;

        if ( show ) {
            const previewId = this.props.show.preview_id
    
            this.props.fetchVideo(previewId);
        }
    }

    togglePlayPause() {

    }

    toggleMute() {

    }
    
    render() {
        const { show } = this.props;

        if ( !show ) {
            return null;
        }

        return (
            <figure className="big-video-preview-wrapper">
                <img src={show && show.posterUrl ? show.posterUrl : window.tempBgURL} className="big-video-poster"></img>
                <video autoPlay 
                       className="big-video"
                       ref={this.videoPlayer}
                >
                    {/* <source src={ videos ? videos[previewShow.preview_id] : ''} type="video/mp4"/> */}
                </video>
                <article className="big-preview-description">

                </article>
            </figure>
        )
    }
}

export default BigPreview;