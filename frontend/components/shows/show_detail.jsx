import React from 'react';

class ShowDetail extends React.Component {
    componentDidMount() {
        this.props.getShowInfo(this.show.id);
    }

    render() {
        <figure className="">

            
        </figure>
    }
}

export default ShowDetail;