import React from 'react';
import ShowPreviewPlayer from './preview_player_small_container';
import ShowDetail from './show_detail_container';

class ShowRow extends React.Component {
    constructor(props) {
        super(props);
        this.createShowRowItem = this.createShowRowItem.bind(this);   
        this.playTimeout;
    }

    createShowRowItem(show) {
        if ( !show ) {
            return null;
        }

        const { rowNum, videos, genres } = this.props;
        const genreList = [];
        const previewVideo = show.show_type === 'FEATURE' ? videos[show.movie_id] : videos[show.episode_ids[0]];

        show.genre_ids.forEach( id => {
            genreList.push(genres[id]);
        });
        return (
            <ShowPreviewPlayer  key={`${show.id}${rowNum}`} 
                                show={show} 
                                preview={previewVideo}
                                genres={genreList}
                                Timeout={this.playTimeout}
            />
        ); 
    }

    render() {
        const { shows, rowNum, genreName } = this.props;
        const showList = [];
        
        shows.forEach( show => {
            showList.push(this.createShowRowItem(show));
        } );
        
        return (
                <li className={`row-${rowNum}-wrapper show-rows-wrapper`}>
                    <h2>{genreName}</h2>
                    
                    <figure className={`row-${rowNum} show-row`}>
                        {showList}
                    </figure>
                    {/* <ShowDetail  /> */}
                </li>
        );
    }
}

export default ShowRow;