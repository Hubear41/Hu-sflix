import { connect } from 'react-redux';
import SessionForm from './session_form';
import { createUser } from '../../actions/session_actions';

const msp = state => ({
    formType: 'Sign Up',
    errors: Object.values(state.errors.session),
});

const mdp = dispatch => ({
    processForm: user => dispatch(createUser(user)),
});

export default connect(msp, mdp)(SessionForm);