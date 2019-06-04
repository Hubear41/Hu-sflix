import React from 'react';
import { withRouter } from 'react-router-dom';
import ShowRows from '../shows/show_rows';

class GenreGallery extends React.Component {
    componentDidMount() {
        this.props.fetchGenres();
    }

    render() {

        return (
            <main className="genre-gallery-wrapper">
                <figure className="big-video-preview-wrapper">
                    <img src="" alt=""/>
                    {/* <video src="">
                        <source/>
                    </video> */}
                    <figcaption className="big-preview-description">

                    </figcaption>
                </figure>

                <section className="gallery-index-wrapper">
                    <ul>
                        {showRowsList}
                    </ul>

                    <section className="index-bg">
                        <footer className='gallery-footer'>
                            
                        </footer>
                    </section>
                </section>
            </main>
        )
    }
}

export default withRouter(GenreGallery);