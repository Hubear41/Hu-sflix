import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import Navbar from './navbar/navbar_container';
import Splash from './splash/splash';
import Background from './background/background';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <>
            <main className="main-content">
                <Navbar />

                <Route exact path="/" component={Splash} />
                <AuthRoute path="/signup" component={SignUp} />
                <AuthRoute path="/login" component={Login} />
            </main>

            <footer className="husflix-footer">
                <a href="" className="website-symbol"><i className="fas fa-ghost"></i></a>
                <a href="https://github.com/Hubear41" className="github-symbol"><i className="fab fa-github"></i></a>
                <a href="" className='linkedin-symbol'><i className="fab fa-linkedin-in"></i></a>
            </footer>
        </>
    );
};

export default App;