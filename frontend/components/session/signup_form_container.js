import { connect } from 'react-redux';
import SessionForm from './session_form';
import { createUser } from '../../actions/session_actions';

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
});

export default connect(null, mdp)(SessionForm);