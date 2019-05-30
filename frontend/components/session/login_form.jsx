import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showing: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const user = { email, password };
        this.props.processForm(user).then( () => this.props.history.push('/browse'));
    } 

    handleGuestSubmit(e) {
        e.preventDefault();
        const guest = { email: 'guest@guest.com', password: 'go_password_go' };
        this.props.loginUser(guest).then(() => this.props.history.push('/browse'));
    }

    togglePassword(e) {
        e.preventDefault();
        this.setState({ showing: !this.state.showing })
    }

    render () {
        const { formType, errors } = this.props;

        const formName = formType === 'Sign Up' ? 'Sign Up' : 'Sign In';

        const emailDescClass = this.state.email !== '' ? 'floating-login-description-small' : 'floating-login-description-big'

        let passwordDescClass, hiddenClass;
        if ( this.state.password !== '') {
            passwordDescClass = 'floating-login-description-small';
            hiddenClass = '';
        } else {
            passwordDescClass = 'floating-login-description-big';
            hiddenClass = 'hidden-show-hide';
        }
        
        const emailError = errors.includes('email')
                            ? <p className="email-error">Please enter a valid email.</p> 
                            : null;
        const passwordError = errors.includes('password')
                            ? <p className="password-error">Your password must contain at least 6 characters.</p> 
                            : null;
        const logininError = errors.includes('login') 
                            ? <p className="login-error">
                                Sorry, we can't find an account with this email address. Please try again or <Link to="/signup" className="create-new-account-link">create a new account</Link>.
                             </p>
                            : null;

        let togglePasswordBtn, passwordIptType;
        if (this.state.showing) {
            togglePasswordBtn = 'HIDE';
            passwordIptType = 'text';
        } else {
            togglePasswordBtn = 'SHOW';
            passwordIptType = 'password';
        }

        return (
            <section className={`login-form-wrapper`}>
                    <section className="login-form-body">
                        <h3>{formName}</h3>
                            
                        <form className="login-form" onSubmit={this.handleSubmit}>
                                {logininError}
                            
                            <div className="login-inputs">
                                <label htmlFor="email">
                                    <input type="text"
                                        id="email"
                                        onChange={this.handleChange('email')}
                                        value={this.state.email}
                                        className={emailError ? 'email-login error-orange' : "email-login"}
                                    />
                                    <span className={emailDescClass}>Email</span>
                                    {emailError}
                                </label>

                                <div className ='password-wrapper'>
                                    <label htmlFor="password" className={passwordError ? "password-login error-orange" : 'password-login'}>
                                        <input type={passwordIptType}
                                            id="password"
                                            onChange={this.handleChange('password')}
                                            value={this.state.password} 
                                        />
                                    </label>
                                    <span className={`${passwordDescClass} password-move`}>Password</span>
                                    {passwordError}

                                    <button className={`${hiddenClass} toggle-show-hide`} onClick={this.togglePassword}>
                                        {togglePasswordBtn}
                                    </button>
                                </div>
                            </div>

                            <input type="submit" value={formName}/>
                        </form>

                        <form onSubmit={this.handleGuestSubmit}>
                            <input type="submit" value="Guest Login" className="login-guest-btn" />
                        </form>

                        <span className="new-to-netflix-signup">New to Hu'sflix? <Link to="/signup" className="signup-link">Sign up now</Link>.</span>
                    </section>
                    <figure className="black-bg"></figure>
            </section>
        )
    }
}

export default withRouter(LoginForm);