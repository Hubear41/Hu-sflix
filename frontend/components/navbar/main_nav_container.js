import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import { searchShows } from '../../actions/show_actions';
import { startLoading, stopLoading } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';
import MainNav from './main_nav';

const msp = ({ entities, session }, ownProps) => {
    let recentId = null;
    const query = new URLSearchParams(ownProps.location.search).get('q') || "";
    
    if ( entities.genres ) {
        Object.values(entities.genres).forEach( genre => {
            switch( genre.name ) {
                case "Recently Added":
                    recentId = genre.id;
                    break;
                default:
                    break;
            }
        });
    }

    return {
        currentUser: entities.users[session.id],
        recentId,
        query,
    }
};

const mdp = dispatch => ({
    logout: () => dispatch(logoutUser()),
    search: query => dispatch(searchShows(query)),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading()),
});

export default withRouter(connect(msp, mdp)(MainNav));