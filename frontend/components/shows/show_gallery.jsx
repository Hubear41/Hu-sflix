import React from 'react';
import ShowRows from './show_rows';
import Footer from '../footer/footer';
import BigPreviewContainer from '../BigPreview/big_preview_container'

class ShowGallery extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            previewId: null,
        }
    }
    
    componentDidMount() {
        const { genreId } = this.props;
        this.props.requestAllShows(genreId);
    }

    componentDidUpdate(prevProps) {        
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const { genreId } = this.props;
            this.props.requestAllShows(genreId);
        }
    }

    static getDerivedStateFromProps(props, state) {
        // we use <= 1 because we could leave show watch and have 1 show in state
        // we still would need to fetch all the shows
        if (state.previewId !== null || props.shows.length <= 1) {
            return { previewId: state.previewId };
        }
        let previewId = null;
        let found = false;

        while (!found) {
            const randomId = Math.floor(Math.random() * (props.shows.length - 1));
            const currShow = props.shows[randomId];
            
            if (currShow !== undefined && currShow.director !== 'Nelicia Low' ) {
                if ( currShow.title !== 'Ling' ) {
                    found = true;
                    previewId = randomId;
                }
            }
        }

        return { previewId };
    }

    createRows() {
        const { shows, genres } = this.props;
        const { previewId } = this.state;
        let  mainGenres = [], showRows = [];
        
        Object.values(genres).forEach( genre => {
            if (genre.shows_with_genre_ids.length >= 6 ) {
                if ( shows[previewId].genre_ids.includes(genre.id) ) {
                    mainGenres = [genre].concat(mainGenres);
                } else {
                    mainGenres.push(mainGenres);
                }
            }
        });
        
        mainGenres.forEach( mainGenre => {
            const genreShows = shows.filter( show => {
                return show.genre_ids.includes(mainGenre.id);
            });

            showRows.push(genreShows);
        });

        return showRows;
    }
    
    render() {
        const { shows, galleryType, videos, genres } = this.props;

        let showsPerRow = null, previewShow = null, showRowsList = null;
        if ( shows.length > 0 ) {
            showsPerRow = this.createRows();
            previewShow = showsPerRow[0][0];

            showRowsList = showsPerRow.map( (row, idx) => {
                return <ShowRows key={idx} rowNum={idx} shows={row} videos={videos} galleryType={galleryType} genres={genres} />
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