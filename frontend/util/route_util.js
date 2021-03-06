import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            !loggedIn ? <Component {...props} /> : <Redirect to="/browse" />
        }
    />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route 
        path={path}
        exact={exact}
        render={props =>
            !loggedIn ? <Redirect to="/" /> : <Component {...props} /> }
    />
);

const msp = state => ({
    loggedIn: Boolean(state.session.id),
})

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));