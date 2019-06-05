import React from 'react';
import ShowRows from './show_rows';
import Footer from '../footer/footer';
import BigPreviewContainer from '../BigPreview/big_preview_container'

class ShowGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVideoId: 0,
        }
    }
    
    componentDidMount() {
        this.props.requestAllShows();

        this.setState({ previewVideoId: Math.floor(Math.random() * 18) });
    }

    createRowsOf(shows) {
        let row = [];
        let showsPerRow = [];
        let idx = 0, count = 0;

        while ( count < 1 ) {
            idx = 0

            while ( idx < shows.length) {
                const currShow = shows[idx];

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

        const showsPerRow = shows ? this.createRowsOf(shows) : null;
        const previewShow = shows ? shows[previewVideoId] : null;   
    
        const showRowsList = showsPerRow.map( (row, idx) => {
            return <ShowRows key={idx} rowNum={idx} shows={row} galleryType={galleryType}/>
        }) 
        
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