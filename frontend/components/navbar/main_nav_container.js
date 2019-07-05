import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import MainNav from './main_nav';

const msp = ({ entities, session }, ownProps) => {
    let recentId = null, moviesId = null, tvShowsId = null;
    const query = new URLSearchParams(ownProps.location.search).get('q') || "";
    
    if ( entities.genres ) {
        Object.values(entities.genres).forEach( genre => {
            switch( genre.name ) {
                case "TV Show":
                    tvShowsId = genre.id;
                    break;
                case "Movie":
                    moviesId = genre.id;
                    break;
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
        moviesId,
        tvShowsId,
        recentId,
        query,
    }
};

const mdp = dispatch => ({
    logout: () => dispatch(logoutUser()),
});

export default withRouter(connect(msp, mdp)(MainNav));