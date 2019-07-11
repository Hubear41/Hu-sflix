import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import Background from './background/background';
import LoadingScreen from './loading/loading_screen';
import ShowIndexGallery from './shows/show_gallery_container';
import GenreGallery from './shows/genre_gallery_container';
import SearchGallery from './shows/search_container';
import MyListGallery from './shows/mylist_gallery_container';
import Watch from './watch/show_watch_container';
import Footer from './footer/footer';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import MainNavBar from './navbar/main_nav_container';

const App = () => {
    return (
        <>
            <Background />
            <main className="main-content">
                <Switch>
                    <AuthRoute exact path={[ "/", "/signup", "/login" ]} component={Navbar} />
                    <ProtectedRoute path={[ "/browse", "/genre", "/search" ]} component={MainNavBar} />
                </Switch>

                <AuthRoute exact path="/" component={Splash} />
                <AuthRoute path="/signup" component={SignUp} />
                <AuthRoute path="/login" component={Login} />

                <ProtectedRoute path={[ "/browse", "/search", "/genre" ]} component={LoadingScreen} />
                <ProtectedRoute exact path="/browse" component={ShowIndexGallery} />
                <ProtectedRoute path="/browse/my-list" component={MyListGallery} />
                <ProtectedRoute path="/search" component={SearchGallery} />
                <ProtectedRoute path="/genre/:genreId" component={GenreGallery} />
                <ProtectedRoute path="/watch/:showId" component={Watch} />
            </main>
            <AuthRoute exact path="/" component={Footer} />
        </>
    );
};

export default App;