import React from 'react';
import ShowRows from './show_rows';

class ShowGallery extends React.Component {
    componentDidMount() {
        this,props.requestShows();
    }

    toggleShowDetailContainer() {

    }
    
    render() {
        const { shows, requestShow } = this.props;
        const showRowsContent = [];

        let row = [];
        for (let idx = 0; idx < shows.length; idx++) {
            const currShow = shows[idx];

            if (Math.floor(idx + 1 % 12) !== 0 ) {
                row.push(currShow);
            } else {
                showRowsContent.push(row);

                row = [currShow];
            }
        }

        const showRowsList = showRowsContent.map( (rowShows, idx) => {
            return <ShowRows key={idx} shows={rowShows} getShowInfo={requestShow} />
        }) 

        render (
            <main className="show-gallery-index">
                <ul>
                    {showRowsList}
                </ul>
            </main>
        )
    }   
}

export default ShowGallery