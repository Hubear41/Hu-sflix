import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <main className="main-content">
            <Navbar />
            

            <Route exact path="/" component={Splash} />
            <AuthRoute path="/signup" component={SignUp} />
            <AuthRoute path="/login" component={Login} />
        </main>
    );
};

export default App;