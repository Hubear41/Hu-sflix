import React from 'react';
import ShowDetail from './show_detail_container';

class ShowPreviewPlayerSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            mute: true,
        };
        this.clickPlay = this.clickPlay.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
    }

    componentDidMount() {
        const width = document.getElementById("show-peek-preview-wrapper").clientWidth;
        const height = width / 1.5;
        
        this.setState({ height });
    }

    clickPlay(e) {

    }

    toggleMute(e) {
        this.setState({ mute: !this.state.mute })
    }
    
    render() {
        const { show, rowNum } = this.props;
        const muteBtn = this.state.mute ? <i className="fas fa-volume-mute mute-symbol"></i> : <i className="fas fa-volume-up mute-symbol"></i>

        return (
            <>
                <section id="show-peek-preview-wrapper" className={`show-row-item-x item-${show.id}`} style={{height: this.state.height}}>
                    <img src={window.tempBgURL} alt="" className="show-title-card hidden-player" />

                    <figure className="show-peek-preview-wrapper">

                        <figure className="preview-video-player">
                            <video src="" className={`show-${show.id} preview-video`} poster={window.tempBgURL}>

                            </video>
                            {/* need on clicks for the entire video that isn't buttons or the jaw-toggle */}
                           
                            <button onClick={this.clickPlay} className="preview-play-btn">
                                <figure className="play-btn-icon">
                                    <i className="fas fa-play play-btn-triangle"></i>
                                    <i className="fas fa-circle play-btn-bg"></i>
                                    <i className="far fa-circle play-btn-outline"></i>
                                </figure>
                            </button>

                            <aside className="preview-player-right-side-btns">
                                <button onClick={this.toggleMute} className="preview-mute-btn">
                                    {muteBtn}
                                    <i className="fas fa-circle mute-btn-bg"></i>
                                    <i className="far fa-circle mute-btn-outline"></i>
                                </button>

                            </aside>

                            <figcaption className="preview-video-info-desc">
                                <h5 className="preview-show-title">{show.title}</h5>
                                <span className="show-maturity-rating">{show.maturity_rating}</span>
                            </figcaption>
                        </figure>



                        <button className="toggle-show-detail-btn"><i className="fas fa-chevron-down"></i></button>
                    </figure>

                    {/* <aside className={`show-row-jaw gallery-jaw-${show.id} hidden`}>
                        <ShowDetail key={show.id} rowNum={rowNum} show={show} />
                    </aside> */}
                </section>
            </>
        );
    }
}

export default ShowPreviewPlayerSmall;