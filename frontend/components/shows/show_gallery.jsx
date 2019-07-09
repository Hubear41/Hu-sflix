import React from 'react';
import ShowRows from './show_rows';
import Footer from '../footer/footer';
import BigPreviewContainer from '../banner_video/banner_video_container'

class ShowGallery extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            previewId: null,
        }
    }
    
    componentDidMount() {
        const { genreId, galleryType, query } = this.props;

        if ( galleryType === 'SEARCH' ) {
            this.props.search(query).then( () => {
                setTimeout( () => {
                    this.props.stopLoading();
                }, 500);
            })
            .fail(() => {
                this.props.stopLoading();
            });
        } else {
            this.props.requestAllShows(genreId)
            .then(() => {
                setTimeout(() => {
                    this.props.stopLoading();
                }, 500);
            })
            .fail( () => {
                this.props.stopLoading();
            });
        }
    }

    componentDidUpdate(prevProps) {        
        if (prevProps.location.pathname !== this.props.location.pathname || prevProps.query !== this.props.query) {
            const { genreId, galleryType, location } = this.props;

            if (galleryType === 'SEARCH') {
                const query = new URLSearchParams(location.search).get("q");

                /// add loading start and stop
                this.props.search(query).then( () => this.props.stopLoading() );
            } else {
                /// add loading start and stop
                this.props.requestAllShows(genreId).then( () => this.props.stopLoading() );
            }

            this.setState({ previewId: null });
        } 
    }

    static getDerivedStateFromProps(props, state) {
        // we use <= 1 because we could leave show watch and have 1 show in state
        // we still would need to fetch all the shows
        if (props.galleryType === 'SEARCH' || state.previewId !== null || props.shows.length <= 1) {
            return { previewId: state.previewId };
        }
        let previewId = null;
        let found = false;

        while (!found && props.shows.length !== 0 ) {
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
        const { shows, genres, mylistShowIds } = this.props;
        const { previewId } = this.state;
        const showsPerRow = {};
        let mainGenres = [];
        let firstGenre = "";
        
        // find genres that have enough shows to fill a row
        Object.values(genres).forEach( genre => {
            if ( genre.name !== 'Movie' && genre.name !== 'TV Show' && genre.name !== 'Recently Added' && genre.shows_with_genre_ids.length >= 6 ) {
                if ( shows[previewId] !== undefined && shows[previewId].genre_ids.includes(genre.id) && !firstGenre ) {
                    firstGenre = genre;
                    mainGenres = [ genre ].concat(mainGenres);
                } else {
                    mainGenres.push(genre);
                }
            }
        });

        // if there are any shows on MyList
        if ( mylistShowIds.length > 0) { 
            const myListShows = [];

            mylistShowIds.forEach( showId => {
                myListShows.push(shows[showId]);
            });
            // debugger
            showsPerRow["My List"] = myListShows;
        }

        // Rows for each main genre
        mainGenres.forEach( genre => {
            const rowShows = shows.filter( show => {
                return show.genre_ids.includes(genre.id);
            });

            showsPerRow[genre.name] = rowShows;
        });

        return showsPerRow;
    }

    createUnorderedRows() {
        const { shows } = this.props;
        const showsPerRow = {};
        let currRow = [];
        let numRows = 0;

        for (let idx1 = 0; idx1 < shows.length; idx1++) {
            const currShow = shows[idx1];
            currRow.push(currShow);

            if (currRow.length >= 6) {
                showsPerRow[numRows] = currRow;
                currRow = [];
                numRows++;
            } else if ( idx1 === shows.length - 1) {
                showsPerRow[numRows] = currRow;
            }
        }

        return showsPerRow;
    }
    
    render() {
        const { shows, videos, genres, galleryType, query, loading } = this.props;
        if ( loading === true ) return null;

        if (shows.length <= 0 && galleryType === 'SEARCH') {
            return (
                <>
                    <section className="show-gallery-index-wrapper no-results" >
                        <article className='no-results-content'>
                            <span>{`Your search for "${query}" did not have any matches.`}</span>
                            <span>Suggestions:</span>
                            <ul>
                                <li>Try different keywords</li>
                                <li>Looking for a movie or TV show?</li>
                                <li>Try using a movie, TV show title, or a director</li>
                                <li>Try a genre, like comedy, romance, or drama</li>
                            </ul>
                        </article>
                    </section>
                    <footer className="gallery-footer">
                        <Footer />
                    </footer>
                </>
            );
        }
        
        let showsPerRow = null, previewShow = null, showRowsList = null;
        if ( shows.length > 0 ) {
            showsPerRow = galleryType !== 'SEARCH' ? this.createRows() : this.createUnorderedRows();
            previewShow = galleryType !== 'SEARCH' ? shows[this.state.previewId] : null;
            
            showRowsList = Object.keys(showsPerRow).map( (genreName, idx) => {
                return <ShowRows key={"row" + idx} 
                                 rowNum={idx} shows={showsPerRow[genreName]} 
                                 genreName={genreName} 
                                 videos={videos} 
                                 genres={genres} 
                                 galleryType={galleryType}
                        />
            }); 
        }

        const galleryStyle = galleryType !== 'SEARCH' ? { top: "75vh" } : { top: "15vh" };
        
        return (
            <section className="show-gallery-index-wrapper" >
                { galleryType !== 'SEARCH' && previewShow ? <BigPreviewContainer show={previewShow} /> : null }

                <section className="gallery-index-wrapper" style={galleryStyle} >
                    
                    <ul className="show-gallery-index" id="gallery-index-bg">
                        {showRowsList}
                    </ul>

                    <figure className="index-bg">
                        <footer className="gallery-footer">
                            <Footer />
                        </footer>
                    </figure>
                </section>
            </section>
        )
    }   
}

export default ShowGallery