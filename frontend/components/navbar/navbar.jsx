import React from 'react';
import { Link, withRouter } from 'react-router-dom';
 
class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.logout().then( () => this.props.history.push('/'));
    }

    render() {
        const { currentUser } = this.props;
        const { location } = this.props.history;
        const navClass = location.pathname === '/' ? "right-header-wrapper" : 'left-header-wrapper'
    
        // changes button style based on whether or not you're on the /signup page
        let SigninBtnClass, headerClass, hasBorder;
        if (location.pathname === '/signup') {
            SigninBtnClass = 'login-btn-white';
            headerClass = 'header-nav centered';
            hasBorder = 'signup-border';
        } else {
            SigninBtnClass = 'login-btn';
            headerClass = 'header-nav';
            hasBorder = '';
        }
        
        if ( currentUser ) {
            return (
                <header className={navClass}>
                    <section className='header-nav centered'>
                        <Link to="/" className='logo-btn'>
                            <img src={window.logoURL} alt="Hu'sflix Logo" className="husflix-logo" />
                            </Link>
                        

                        <button onClick={this.handleClick} className="logout-btn">Log Out</button>

                    </section>
                </header>
            );  
        } else {
            return (
                <header className={`${navClass} ${hasBorder}`}>
                    <section className={headerClass}>
                        <Link to="/" className='logo-btn'>
                            <img src={window.logoURL} alt="Hu'sflix Logo" className="husflix-logo" />
                        </Link>


                        { location.pathname === "/login" ? null : <Link to="/login" className={SigninBtnClass}>Sign In</Link>}
                    </section>
                </header>
            );
        }
    }
};

export default withRouter(Navbar);