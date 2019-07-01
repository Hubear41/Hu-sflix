import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import Background from './background/background';
import ShowIndexGallery from './shows/show_gallery_container';
import GenreGallery from './shows/genre_gallery_container';
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
                    <ProtectedRoute path="/browse" component={MainNavBar} />
                    <AuthRoute path="/signup" component={Navbar} />
                    <AuthRoute path="/login" component={Navbar} />
                    <AuthRoute exact path="/" component={Navbar} />
                </Switch>

                <AuthRoute exact path="/" component={Splash} />
                <AuthRoute path="/signup" component={SignUp} />
                <AuthRoute path="/login" component={Login} />
                <ProtectedRoute path="/browse" component={ShowIndexGallery} />
                <ProtectedRoute path="/genre/:genreId" component={GenreGallery} />
                <ProtectedRoute path="/watch/:showId/:videoId" component={Watch} />
            </main>
            <AuthRoute exact path="/" component={Footer} />
        </>
    );
};

export default App;