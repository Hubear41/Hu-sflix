import { connect } from 'react-redux';
import Navbar from './navbar';
import { logoutUser } from '../../actions/session_actions';

const msp = ({ entities, session }) => ({
    currentUser: entities.users[session.id],
});

const mdp = dispatch =>({
    logout: id => dispatch(logoutUser(id)),
});

export default connect(msp, mdp)(Navbar);