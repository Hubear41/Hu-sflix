import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { createUser, loginUser } from '../../actions/session_actions';
import { clearErrors } from '../../actions/errors_actions'; 

const msp = state => ({
    formType: 'Sign Up',
    errors: state.errors.session, 
});

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    loginUser: user => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(msp, mdp)(SignupForm);