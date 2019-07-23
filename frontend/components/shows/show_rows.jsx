import React from 'react';
import ShowPreviewPlayer from './preview_player_small_container';
import ShowDetail from './show_detail_container';

class ShowRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            rowWidth: window.innerWidth,
        }

        this.moveToSliderPage = this.moveToSliderPage.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("resize", this.handleResize);
    }

    createShowRowItem(show, rowNum, videos, genres) {
        if (!show) {
            return null;
        }

        const genreList = [];
        const previewVideo = show.show_type === 'FEATURE' ? videos[show.movie_id] : videos[show.episode_ids[0]];

        show.genre_ids.forEach(id => {
            genreList.push(genres[id]);
        });
        return (
            <ShowPreviewPlayer key={`${show.id}${rowNum}`}
                show={show}
                preview={previewVideo}
                genres={genreList}
            />
        );
    }

    moveToSliderPage(num) {
        return e => {
            this.setState({ currentPage: num });
        }
    }

    createPageIndicators(numPages) {
        const { currentPage } = this.state;
        const { rowNum } = this.props;
        const pageIndicators = [];

        for (let i = 0; i < numPages; i++) {
            let selected = false;
            if (currentPage === i) selected = true;

            if (selected) {
                pageIndicators.push(
                    <li className={`page-indicator indicator-${i + 1} selected-page`} key={"" + rowNum + i}></li>);
            } else {
                pageIndicators.push(
                    <li className={`page-indicator indicator-${i + 1}`} key={"" + rowNum + i}></li>);
            }
        }

        return pageIndicators;
    }

    handleResize() {
        if ( this._isMounted && this.state.rowWidth !== window.innerWidth ) {
            this.setState({ rowWidth: window.innerWidth });
        }
    }

    render() {
        const { shows, rowNum, genreName, galleryType, genres, videos } = this.props;
        const { currentPage, rowWidth } = this.state;

        const showList = [];
        const rowHeader = galleryType === 'WITH_BANNER' ? <h2>{genreName}</h2> : null;
        
        const numShowsPerRow = Math.round(rowWidth / 300);
        const numPages = Math.ceil(shows.length / numShowsPerRow);

        const startingIdx = numShowsPerRow * currentPage;
        for (let idx = startingIdx; showList.length <= numShowsPerRow; idx++) {
            const show = shows[idx];
            showList.push(this.createShowRowItem(show, rowNum, videos, genres));
        }
        
        const pageIndicators = rowWidth > 0 ? this.createPageIndicators(numPages) : null;

        return (
            <li className={`row-${rowNum}-wrapper show-rows-wrapper`}>
                {rowHeader}
                
                {numPages > 1 ? 
                    <ul className="slider-page-indicator">
                        {pageIndicators}
                    </ul>
                    : null
                }
                
                <figure className={`row-${rowNum} show-row`}>
                    {showList}
                </figure>
                <div className="next-page-button" onClick={this.moveToSliderPage(currentPage + 1)}></div>
                {/* <ShowDetail  /> */}
            </li>
        );
    }
}

export default ShowRow;