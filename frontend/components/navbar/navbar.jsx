import React from 'react';
import { Link } from 'react-router-dom';
 
class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.logout();
    }

    render() {
        if ( currentUser ) {
            return (
                <div className="logout-btn">
                    <button onClick={this.handleClick}>Log Out</button>
                </div>
            );  
        } else {
            return (
                <div className="signin-btn">
                    <Link to="/login">Sign In</Link>
                </div>
            );
        }
    }
};

export default Navbar;