import React from 'react';
import ShowPreviewPlayer from './show_preview_player_small';

class ShowRow extends React.Component {
    constructor(props) {
        super(props);
        this.video = null;
    }

    render() {
        const { shows, rowNum } = this.props;
        
        const showList = [];
        shows.forEach( show => {
            showList.push(<ShowPreviewPlayer key={show.id} show={show} />); 
        } );
        
        return (
                <li className={`show-row-${rowNum}-wrapper show-rows-wrapper`}>
                    <h2>{`row ${rowNum}`}</h2>
                    
                    <figure className={`show-row-${rowNum} show-row`}>
                        {showList}
                    </figure>
                </li>
        );
    }
}

export default ShowRow;