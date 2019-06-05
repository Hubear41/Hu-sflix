import React from 'react';
import ShowRows from './show_rows';
import Footer from '../footer/footer';
import BigPreviewContainer from '../BigPreview/big_preview_container'

class ShowGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVideoId: Math.floor(Math.random() * 18),
        };
    }
    
    componentDidMount() {
        this.props.requestAllShows();
    }

    // static getDerivedStateFromProps(props) {
    //     if ( props.shows.length < 1 ) {
    //         return [];
    //     }

    //     // finds a random video to put into the preview after requesting all shows
    //     let previewId = null;
    //     let found = false;

    //     while (!found) {
    //         const randomId = ;

    //         if (props.shows[randomId].director !== 'Nelicia Low' || props.shows[randomId].title !== 'Ling') {
    //             found = true;
    //             previewId = randomId;
    //         }
    //     }

    //     return { previewId };
    // }

    createRowsOf(previewId) {
        const { shows } = this.props;
        let row = [];
        let showsPerRow = [];
        let idx = 0, count = 0;

        row.push(shows[previewId]);

        while ( count < 1 ) {
            idx = 0

            while ( idx < shows.length) {
                const currShow = shows[idx];

                if ( currShow.id === previewId ) {
                    continue;
                }

                if (Math.floor(idx % 6) !== 0 || idx === 0) {
                    row.push(currShow);
                } else if (Math.floor(idx % 6) === 0 ) {
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

        return showsPerRow;
    }
    
    render() {
        const { shows, galleryType } = this.props;
        const { previewVideoId } = this.state;

        let showsPerRow = null, previewShow = null, showRowsList = null;
        if ( shows.length > 0 ) {
            showsPerRow = this.createRowsOf(previewVideoId);
            previewShow = showsPerRow[0][0];
            
            showRowsList = showsPerRow.map( (row, idx) => {
                return <ShowRows key={idx} rowNum={idx} shows={row} galleryType={galleryType}/>
            }) 
        }
        
        return (
            <main className="show-gallery-index-wrapper">
                { previewShow ? <BigPreviewContainer show={previewShow} /> : null }

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