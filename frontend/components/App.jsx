import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <>
            <header className="header-nav">
                <Navbar />
            </header>

            <Route exact path="/" component={Splash} />
            <AuthRoute path="/signup" component={SignUp} />
            <AuthRoute path="/login" component={Login} />
        </>
    );
};

export default App;