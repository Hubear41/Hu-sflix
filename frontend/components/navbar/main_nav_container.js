import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import MainNav from './main_nav';

const msp = ({ entities, session }) => ({
    currentUser: entities.users[session.id],
});

const mdp = dispatch => ({
    logout: () => dispatch(logoutUser()),
});

export default connect(msp, mdp)(MainNav);