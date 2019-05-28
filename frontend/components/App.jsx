import React from 'react';
import SignUp from './session/signup_form_container';
import Login from './session/login_form_container';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
        <main>
            <header>
                <h1>Hu'sflix</h1>
            </header>

            <AuthRoute path="/signup" component={SignUp} />
            <AuthRoute path="/login" component={Login} />
        </main>
    );
};

export default App;