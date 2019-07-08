import { connect } from 'react-redux';
import React from 'react';

const msp = ({ ui }) => ({
    loading: ui.loading
});

const loadingScreen = props => {
    let loadAnimation = "";
    if ( props.loading === false ) {
        return null;
    } else {
        loadAnimation = "fade-in-loading";
    }

    const thumbnails = [];
    for (let i = 0; i < 7; i++) {
        const delay = (i * 0.2);
        thumbnails.push(<div key={i} className="loading-thumb load-animation" style={{ animationDelay: `${delay}s`}} ></div>)
    }

    return (
        <figure className={`loading-screen ${loadAnimation}`}>
            <div className='loading-content'>
                <h2 className='loading-title load-animation'></h2>
                <div className='loading-row'>
                    {thumbnails}
                </div>
            </div>
        </figure>
    )
}

export default connect(msp)(loadingScreen);