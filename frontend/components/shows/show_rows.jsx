import React from 'react';
import ShowPreviewPlayer from './preview_player_small_container';

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

        const { rowNum, videos } = this.props;
        const previewVideo = show.show_type === 'FEATURE' ? videos[show.movie_id] : videos[show.episode_ids[0]];
        
        return (
            <ShowPreviewPlayer  key={`${show.id}${rowNum}`} 
                                show={show} 
                                preview={previewVideo}
                                Timeout={this.playTimeout}
            />
        ); 
    }

    // remove this once genres are add
    findHeaderName(rowNum) {
        switch(rowNum) {
            case 0:
                return 'Suspenseful Dramas';
            case 1:
                return 'Heartbreaking Movies';
            case 2:
                return 'Exciting Shows';
            default:
                return '';
        }
    }

    render() {
        const { shows, rowNum, galleryType } = this.props;
        const showList = [];
        
        shows.forEach( show => {
            showList.push(this.createShowRowItem(show));
        } );
        
        const headerText = galleryType ? this.findHeaderName(rowNum) : "";

        return (
                <li className={`row-${rowNum}-wrapper show-rows-wrapper`}>
                    <h2>{headerText}</h2>
                    
                    <figure className={`row-${rowNum} show-row`}>
                        {showList}
                    </figure>
                </li>
        );
    }
}

export default ShowRow;