import React from 'react';
import { Link, withRouter } from 'react-router-dom';
 
class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { currentUser } = this.props;
        this.props.logout(currentUser.id);
    }

    render() {
        const { currentUser } = this.props;
        const { location } = this.props.history;
        const navClass = location.pathname === '/' ? "right-header-wrapper" : 'left-header-wrapper'
        const headerClass = location.pathname === '/signup' ? 'header-nav centered' : 'header-nav';
       
        // changes button style based on whether or not you're on the /signup page
        const SigninBtnClass = location.pathname === '/signup' ? 'login-btn-white' : 'login-btn';
        
        if ( currentUser ) {
            return (
                <header className={navClass}>
                    <section className={headerClass}>
                        <Link to="/" className='logo-btn'>Hu'sflix</Link>
                        

                        <button onClick={this.handleClick} className="logout-btn">Log Out</button>

                    </section>
                </header>
            );  
        } else {
            return (
                <header className={navClass}>
                    <section className={headerClass}>
                        <Link to="/" className='logo-btn'>Hu'sflix</Link>


                        { location.pathname === "/login" ? null : <Link to="/login" className={SigninBtnClass}>Sign In</Link>}
                    </section>
                </header>
            );
        }
    }
};

export default withRouter(Navbar);