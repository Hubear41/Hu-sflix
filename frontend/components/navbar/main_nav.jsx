import React from 'react';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
        };
        this.navbar = React.createRef();
        this.handleLogout = this.handleLogout.bind(this);

        document.addEventListener('scroll', e => {
            const navbarEl = this.navbar.current;
        });
    }
    
    handleLogout() {
        this.props.logout();
    }

    render() {
        return (
            <header className="main-nav-bar-wrapper">
                <header className="main-nav-bar" ref={this.navbar}>
                    <section className='left-nav'>
                        <section className="main-logo-container">
                            <Link to="/browse" className='main-logo-btn'>
                                <img src={window.logoURL} alt="Hu'sflix Logo" className="husflix-logo" />
                            </Link>
                        </section>
                        <nav className="nav-btns">
                            <Link to="/browse" className="home-btn">Home</Link>

                        </nav>
                    </section>

                    <section className="right-nav">
                        <section className="search-bar">
                        </section>

                        <p className="toggle-nav-dropdown-menu" onClick={this.toggleDropDown}>
                            <i className="fas fa-caret-down"></i>
                        </p>
                        <section className="nav-dropdown-menu">
                            <i className="fas fa-caret-up"></i>
                            <section className="nav-dropdown-profiles">
                                <span>Manage Profiles</span>
                            </section>
                            <section className="nav-dropdown-links">
                                <button onClick={this.handleLogout} className="logout-btn">Sign out of Hu'sflix</button> 
                            </section>
                        </section>
                    </section>
                </header>
            </header>
        )
    }
}


export default MainNav;