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
            searching: null,
            search: this.props.query,
            previous: "/browse",
        };
        this.navbar = React.createRef();
        this.searchBar = React.createRef();
        this.searchField = React.createRef();
        this.handleLogout = this.handleLogout.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('scroll', this.handleScroll);
    }
    
    handleLogout() {
        this.props.logout();
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.pageYOffset === 0) {
            this.setState({ background: CLEAR });
        } else {
            this.setState({ background: DARK });
        }
    }

    handleClick(e) {
        const { location } = this.props;
        
        if ( !e.target.hash.includes(location.pathname) ) {
            this.props.startLoading();
            this.setState({ 
                search: "", 
                searching: this.state.searching === null ? null : false  
            });
        }
    }
    
    handleSearchClick() {
        const root = document.getElementById('root');

        root.addEventListener('click', e => {
            if ( this._isMounted && this.state.search === "" && e.target !== this.searchBar.current && e.target !== this.searchField.current ) {
                if ( this.state.searching !== false ) {
                    this.setState({ searching: false });
                }
            }
        });

        document.addEventListener('keydown', e => {
            if ( e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault();
            }
        });

        this.searchField.current.focus();

        this.setState({ searching: true });
    }

    handleClear() {
        this.searchField.current.value = "";
        this.updateSearch();
    }

    updateSearch() {
        const { history, location } = this.props;
        const textInput = this.searchField.current;

        if ( textInput.value === "" && location.pathname !== this.state.previous) {
            history.push(this.state.previous);
            this.props.startLoading();
            this.setState({ search: "" });
        } else if ( textInput.value !== "" ) {
            clearTimeout(this.searchTimeout);
            this.setState({ search: textInput.value });
            
            this.searchTimeout = setTimeout( () => {
                this.props.search(this.state.search);

                this.props.startLoading() 
                this.setState({ previous: location.pathname.includes("/search") ? this.state.previous : location.pathname });

                history.push({
                    pathname: '/search',
                    search: `q=${this.state.search}`
                });

            }, 500);
        }
    }

    render() {
        const { tvShowsId, moviesId, recentId } = this.props;
        const { pathname } = this.props.location;
        const { background } = this.state;
        let searchAnimation = 'search-default';
        
        if (this.state.searching === true || this.state.search.length > 0) {
            searchAnimation = 'visible-search-bar';
        } else if ( this.state.searching === false) {
            searchAnimation = 'hidden-search-bar';
        }

        const xOpacity = this.state.search.length > 0 ? 'visible-x' : 'hidden-x';

        const homeBold = pathname === "/browse" ? "current-nav" : "";
        const tvBold = pathname === `/genre/${tvShowsId}` ? "current-nav" : "";
        const movieBold = pathname === `/genre/${moviesId}` ? "current-nav" : "";
        const recentBold = pathname === `/genre/${recentId}` ? "current-nav" : "";     
        const mylistBold = pathname === '/browse/my-list' ? "current-nav" : "";     
        
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
                            <Link to="/browse" className='main-logo-btn' onClick={this.handleClick} >
                                <img src={window.logoURL} alt="Hu'sflix Logo" className="husflix-logo" />
                            </Link>
                        </section>
                        <nav className="nav-btns-wrapper">
                            <Link to="/browse"               className={`nav-btn ${homeBold}`}   onClick={this.handleClick} >Home</Link>
                            <Link to={`/genre/${tvShowsId}`} className={`nav-btn ${tvBold}`}     onClick={this.handleClick} >TV Shows</Link>
                            <Link to="/browse/movies"        className={`nav-btn ${movieBold}`}  onClick={this.handleClick} >Movies</Link>
                            <Link to="/browse/tvshows"       className={`nav-btn ${recentBold}`} onClick={this.handleClick} >Recently Added</Link>
                            <Link to="/browse/my-list"       className={`nav-btn ${mylistBold}`} onClick={this.handleClick} >My List</Link>
                        </nav>
                    </section>

                    <section className="right-nav">
                        <form className={`search-bar-form ${searchAnimation}`} ref={this.searchBar} onSubmit={e => e.preventDefault()} >
                            <i className="fas fa-search search-icon" onClick={this.handleSearchClick} ></i>
                            <input type="text"
                                   className='search-input'
                                   placeholder="Titles, directors, genres"
                                   value={this.state.search}
                                   onChange={this.updateSearch}
                                   ref={this.searchField}
                            />
                            <button className={`search-x ${xOpacity}`} onClick={this.handleClear}>X</button> 
                        </form>

                        <div className="toggle-nav-dropdown-menu" onClick={this.toggleDropDown}>
                            <i className="fas fa-caret-down"></i>
                            <section className="nav-dropdown-menu">
                                <i className="fas fa-caret-up"></i>
                                <section className="nav-dropdown-profiles">
                                    <span>Manage Profiles</span>
                                </section>
                                <section className="nav-dropdown-links">
                                    <button onClick={this.handleLogout} className="logout-btn">Sign out of Hu'sflix</button> 
                                </section>
                            </section>
                        </div>
                        
                    </section>
                </header>
            </header>
        )
    }
}


export default MainNav;