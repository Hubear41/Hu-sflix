import React from 'react';
import { Link, withRouter } from 'react-router-dom';
 
class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.logout();
    }

    render() {
        const { currentUser } = this.props;
        const { location } = this.props.history;

        if ( currentUser ) {
            return (
                <section className="header-nav">
                    <Link to="/" className='logo-btn'>Hu'sflix</Link>
                    

                    <button onClick={this.handleClick} className="logout-btn">Log Out</button>

                </section>
            );  
        } else {
            return (
                <section className="header-nav">
                    <Link to="/" className='logo-btn'>Hu'sflix</Link>


                    { location.pathname === "/login" ? null : <Link to="/login" className="login-btn">Sign In</Link>}
                </section>
            );
        }
    }
};

export default withRouter(Navbar);