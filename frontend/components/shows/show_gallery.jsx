import React from 'react';
import ShowRows from './show_rows';
import Footer from '../footer/footer';

class ShowGallery extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.requestAllShows();
    }

    createRowsOf(shows) {
        let row = [];
        let showsPerRow = [];
        let showToPreview = null;
        let idx = 0, count = 0;
        
        while ( count < 1 ) {
            idx = 0

            while ( idx < shows.length) {
                const currShow = shows[idx];

                if (currShow.title === 'Ling'){
                    showToPreview = currShow;
                }

                if (Math.floor(idx % 3) !== 0 || idx === 0) {
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
        const { shows, galleryType } = this.props;

        let showsPerRow, showPreview;
        [showsPerRow, showPreview] = this.createRowsOf(shows);   

        const showRowsList = showsPerRow.map( (row, idx) => {
            return <ShowRows key={idx} rowNum={idx} shows={row} galleryType={galleryType}/>
        }) 
        
        return (
            <main className="show-gallery-index-wrapper">
                <figure className="big-video-preview-wrapper">
                    <img src={showPreview && showPreview.posterUrl ? showPreview.posterUrl : window.tempBgURL } className="big-video-poster"></img>
                    <video autoPlay className="big-video">
                        {/* <source src={ videos ? videos[previewShow.preview_id] : ''} type="video/mp4"/> */}
                    </video>
                    <article className="big-preview-description">

                    </article>
                   
                </figure>
                <section className="gallery-index-wrapper">
                    
                    <ul className="show-gallery-index" id="gallery-index-bg">
                        {showRowsList}
                    </ul>

                    <figure className="index-bg">
                        <footer className="gallery-footer">
                            <Footer />
                        </footer>
                    </figure>
                </section>
            </main>
        )
    }   
}

export default ShowGallery