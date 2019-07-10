import React from 'react';
import ShowPreviewPlayer from './preview_player_small_container';
import ShowDetail from './show_detail_container';

const ShowRow = props => {
    const { shows, rowNum, genreName, galleryType, genres, videos } = props;
    const showList = [];
    const rowHeader = galleryType === 'WITH_BANNER' ? <h2>{genreName}</h2> : null;
    
    shows.forEach( show => {
        showList.push(createShowRowItem(show, rowNum, videos, genres));
    } );
    
    return (
            <li className={`row-${rowNum}-wrapper show-rows-wrapper`}>
                {rowHeader}      
                <figure className={`row-${rowNum} show-row`}>
                    {showList}
                </figure>
                {/* <ShowDetail  /> */}
            </li>
    );
}

const createShowRowItem = (show, rowNum, videos, genres) => {
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

export default ShowRow;