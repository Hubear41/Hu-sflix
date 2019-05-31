import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import Background from './background/background';
import ShowIndexGallery from './shows/show_gallery_container';
import Watch from './watch/show_watch_container';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <>
            <Background />
            <main className="main-content">
                <Navbar />

                <Route exact path="/" component={Splash} />
                <AuthRoute path="/signup" component={SignUp} />
                <AuthRoute path="/login" component={Login} />
                <ProtectedRoute path="/browse" component={ShowIndexGallery} />
                <ProtectedRoute path="/watch/:showId/:videoId" component={Watch} />
            </main>

            <footer className="husflix-footer">
                <a href="" className="website-symbol">
                    <i className="fas fa-ghost"></i>
                </a>
                <a href="https://github.com/Hubear41" className="github-symbol">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/dennisdhu/" className='linkedin-symbol'>
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </footer>
        </>
    );
};

export default App;