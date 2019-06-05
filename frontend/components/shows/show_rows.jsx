import React from 'react';
import ShowPreviewPlayer from './show_preview_player_small';

class ShowRow extends React.Component {
    constructor(props) {
        super(props);
        this.video = null;
    }

    render() {
        const { shows, rowNum, galleryType } = this.props;
        
        const showList = [];
        debugger
        shows.forEach( show => {
            showList.push(<ShowPreviewPlayer key={show.id} show={show} />); 
        } );
        
        const headerText = galleryType ? `row ${rowNum + 1}` : "";

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