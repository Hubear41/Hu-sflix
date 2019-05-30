import React from 'react';
import { Route } from 'react-router-dom';
import ShowDetail from './show_detail';


class ShowRow extends React.Component {
    
    render() {
        const { shows, getShowInfo, key } = props;
        
        const showlist = shows.map( show => {
            return (
                <li>
                    <div className={`show-row-${key}`}>
                        <section className={`show-row-item-${key} show-row-items`}>
                            <img src="" alt="" className="show-poster-img" />
                            
                            <figure className="show-preview-player">
                                <figure className="preview-video-player">
                                    <video src="" className={`show-${show.id}`}>

                                    </video>
                                    {/* need to find symbols for the play pause button */}
                                    {/* define on click methods for each button */}
                                    {/* need on clicks for the entire video that isn't buttons or the jaw-toggle */}
                                    <button onClick={togglePlayPause()} className="preview-play-pause-btn"></button> 
                                    <button onClick={toggleMuteUnmute()} className="preview-mute-btn"></button>
                                </figure>
                                

                                <figcaption>
                                    <h5 className="preview-show-title">{show.title}</h5>
                                    <span className="show-maturity-rating">{show.maturity_rating}</span>
                                </figcaption>

                                <button className="toggle-show-detail-btn"></button>
                            </figure>
                        </section>

                        <li className={`show-row-jaw gallery-jaw-${key} hidden`}>
                            <ShowDetail key={show.id} show={show} getShowInfo={getShowInfo} />
                        </li>
                    </div>
                </li>
            )
        });
    
        return (
            <ul className={`show-row-container-${key}`}>
                {showList}
            </ul>
        );
    }
}

export default ShowRow;