import { connect } from 'react-redux';
import SessionForm from './session_form';
import { loginUser } from '../../actions/session_actions';

const msp = state => ({
    formType: 'Log In',
    errors: Object.values(state.errors.session),
});

const mdp = dispatch => ({
    processForm: user => dispatch(loginUser(user)),
});

export default connect(msp, mdp)(SessionForm);