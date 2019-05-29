import React from 'react';
import { withRouter } from 'react-router-dom';


const Background = props => {
    const { location } = props.history;

    const backgroundColor = location.pathname === '/signup' ? "white-bg" : "black-bg"; 

    return <figure className={`husflix-bg ${backgroundColor}`}></figure>;
};


export default withRouter(Background);