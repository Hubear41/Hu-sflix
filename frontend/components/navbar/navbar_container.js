import { connect } from 'react-redux';
import Navbar from './navbar';
import { logoutUser } from '../../actions/session_actions';

const msp = ({ entities, session }) => ({
    currentUser: entities.users[session.id],
});

const mdp = dispatch =>({
    logout: () => dispatch(logoutUser()),
});

export default connect(msp, mdp)(Navbar);