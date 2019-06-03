import React from 'react';
import ShowRows from './show_rows';

class ShowGallery extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.requestAllShows();
        // this.chooseBigPreviewShow();
    }

    // chooseBigPreviewShow() {
    //     const { shows } = this.props;
    //     let previewShow, availableShows = [];
        
    //     for (let i = 0; i < shows.length; i++) {
    //         const show = shows[i];
    //         debugger
    //         if ( show.title === 'Ling') {
    //             previewShow = show;
    //         } else {
    //             availableShows.push(show);
    //         }
    //     }

    //     return previewShow.id;
    // }

    createRowsOf(shows) {
        let row = [];
        let showsPerRow = [];
        let showToPreview = null;
        let idx = 0, count = 0;

        // while ( count < 60) {
        //     idx = 0;
        while ( count < 4 ) {
            idx = 1

            while ( idx < shows.length) {
                const currShow = shows[idx];

                if (currShow.title === 'Ling'){
                    showToPreview = currShow;
                } else if (Math.floor(idx % 3) !== 0) {
                    row.push(currShow);
                } else if (Math.floor(idx % 3) === 0 ) {
                    showsPerRow.push(row);

                    row = [currShow];
                }
                idx++;
            }

            if ( row.length > 0 ) {
                showsPerRow.push(row);
            }

            count++;
        }


        return [showsPerRow, showToPreview];
    }
    
    render() {
        const { videos, shows } = this.props;

        let showsPerRow, showPreview;
        [showsPerRow, showPreview] = this.createRowsOf(shows);   

        const showRowsList = showsPerRow.map( (row, idx) => {
            return <ShowRows key={idx} rowNum={idx} shows={row} />
        }) 

        return (
            <main className="show-gallery-index-wrapper">
                <figure className="big-video-preview-wrapper">
                    <img src={showPreview ? showPreview.poster_url : ""} className="big-video-poster"></img>
                    <video autoPlay className="big-video">
                        {/* <source src={ videos ? videos[previewShow.preview_id] : ''} type="video/mp4"/> */}
                    </video>
                    <article className="big-preview-description">

                    </article>
                   
                </figure>
                <section className="gallery-index-wrapper">
                    <figure className="index-bg"></figure>
                    <ul className="show-gallery-index">
                        {showRowsList}
                    </ul>
                </section>
            </main>
        )
    }   
}

export default ShowGallery