import React from 'react';
import { Link } from 'react-router-dom';

const CLEAR = "CLEAR";
const DARK = "DARK"

class MainNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
            background: null,
        };
        this.navbar = React.createRef();
        this.handleLogout = this.handleLogout.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    handleLogout() {
        this.props.logout();
    }

    handleScroll() {
        if (window.pageYOffset === 0) {
            this.setState({ background: CLEAR });
        } else {
            this.setState({ background: DARK });
        }
    }

    render() {
        const { tvShowsId, moviesId, recentId } = this.props;
        const { pathname } = this.props.location;
        const { background } = this.state;

        const homeBold = pathname === "/browse" ? "current-nav" : "";
        const tvBold = pathname === `/genre/${tvShowsId}` ? "current-nav" : "";
        const movieBold = pathname === `/genre/${moviesId}` ? "current-nav" : "";
        const recentBold = pathname === `/genre/${recentId}` ? "current-nav" : "";     
        
        let navAnimation = "";
        if ( background === CLEAR ) {
            navAnimation = "fade-clear-nav";
        } else if (background === DARK ) {
            navAnimation = "fade-dark-nav";
        }

        return (

            <header className="main-nav-bar-wrapper">
                <header className={`main-nav-bar ${navAnimation}`} ref={this.navbar} onScroll={this.handleScroll}>
                    <section className='left-nav'>
                        <section className="main-logo-container">
                            <Link to="/browse" className='main-logo-btn'>
                                <img src={window.logoURL} alt="Hu'sflix Logo" className="husflix-logo" />
                            </Link>
                        </section>
                        <nav className="nav-btns-wrapper">
                            <Link to="/browse" className={`nav-btn ${homeBold}`}>Home</Link>
                            <Link to={`/genre/${tvShowsId}`} className={`nav-btn ${tvBold}`}>TV Shows</Link>
                            <Link to={`/genre/${moviesId}`} className={`nav-btn ${movieBold}`}>Movies</Link>
                            <Link to={`/genre/${recentId}`} className={`nav-btn ${recentBold}`}>Recently Added</Link>
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
                                {/* <span>Manage Profiles</span> */}
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