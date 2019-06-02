import React from 'react';
import ShowRows from './show_rows';

class ShowGallery extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.requestAllShows();
    }

    // toggleShowDetailContainer() {

    // }

    createRowsOf(shows) {
        let row = [];
        let showsPerRow = [];
        let idx = 0;

        while ( idx < shows.length ) {
            const currShow = shows[idx];

            if (Math.floor(idx + 1 % 12) !== 0) {
                row.push(currShow);
            } else {
                showsPerRow.push(row);

                row = [currShow];
            }
            idx++;
        }

        if ( row.length > 0 ) {
            showsPerRow.push(row);
        }

        return showsPerRow;
    }
    
    render() {
        const { shows, requestShow } = this.props;
        
        const showsPerRow = this.createRowsOf(shows);   

        const showRowsList = showsPerRow.map( (row, idx) => {
            return <ShowRows key={idx} rowNum={idx} shows={row} getShowInfo={requestShow} />
        }) 

        return (
            <main className="show-gallery-index-wrapper">
                <figure className="big-video-preview">
                    
                </figure>
                <ul className="show-gallery-index">
                    {showRowsList}
                </ul>
            </main>
        )
    }   
}

export default ShowGallery