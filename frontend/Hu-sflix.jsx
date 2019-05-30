import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { fetchVideo, fetchShow, fetchShows } from './actions/show_actions';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store;

    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // testing stuff
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    window.fetchVideo = fetchVideo;
    window.fetchShow = fetchShow;
    window.fetchShows = fetchShows;
    // end of testing

    ReactDOM.render(<Root store={store} />, root);
});