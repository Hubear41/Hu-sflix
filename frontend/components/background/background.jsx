import React from 'react';
import { withRouter } from 'react-router-dom';


const Background = props => {
    const { location } = props.history;

    const backgroundColor = location.pathname === '/signup' ? "white-bg" : "hidden-bg"; 

    return <figure className={`${backgroundColor}`}></figure>

};


export default withRouter(Background);