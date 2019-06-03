import React from 'react';
import { withRouter } from 'react-router-dom';
import ShowDetail from './show_detail_container';

class ShowPreviewPlayerSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            mute: true,
        };
        this.launchWatch = this.launchWatch.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        // this.openDropDown = this.openDropDown.bind(this);
    }

    componentDidMount() {
        const width = document.getElementById("show-peek-preview-wrapper").clientWidth;
        const height = width / 1.5;
        
        this.setState({ height });
    }
    
    launchWatch(e) {
        const { show } = this.props;
        if (show.show_type === 'FEATURE') {
            this.props.history.push(`/watch/${show.id}/${show.movie_id}`)
        } else {    
            this.props.history.push(`/watch/${show.id}/${show.episode_ids[0]}`)    
        }
    }

    toggleMute(e) {
        const { show } = this.props;
        const smallPlayer = document.findByElementId(`show-${show.id}`);

        if ( smallPlayer.muted ) {
            smallPlayer.muted = false;
        } else {
            smallPlayer.muted = true;
        }

        this.setState({ mute: !this.state.mute })
    }

    // openDropDown(e) {

    // }
    
    render() {
        const { show } = this.props;
        const muteBtn = this.state.mute ? <i className="fas fa-volume-mute mute-symbol"></i> : <i className="fas fa-volume-up mute-symbol"></i>

        return (
            <>
                <section id="show-peek-preview-wrapper" 
                         className={`show-row-item-x item-${show.id}`} 
                         style={{height: this.state.height}} 
                         onClick={this.launchWatch}>
                                
                    <img src={show ? show.poster_url : ''} alt="" className="show-title-card" />

                    <figure className="show-peek-preview-player" onClick={this.launchWatch}>

                        <figure className="preview-video-player">
                            <video id={`show-${show.id} preview-video`} poster={window.tempBgURL}>
                                {/* <source src="" type="video/mp4"/> */}
                            </video>
                           
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



                        <button className="toggle-show-detail-btn">
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </figure>

                    {/* <aside className={`show-row-jaw gallery-jaw-${show.id} hidden`}>
                        <ShowDetail key={show.id} rowNum={rowNum} show={show} />
                    </aside> */}
                </section>
            </>
        );
    }
}

export default withRouter(ShowPreviewPlayerSmall);