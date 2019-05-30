import { connect } from 'react-redux';
import LoginForm from './login_form';
import { loginUser } from '../../actions/session_actions';
import { clearErrors } from '../../actions/errors_actions';

const msp = state => ({
    formType: 'Log In',
    errors: state.errors.session,
});

const mdp = dispatch => ({
    loginUser: user => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(msp, mdp)(LoginForm);