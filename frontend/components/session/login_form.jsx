import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.props.processForm(this.state).then( () => this.props.history.push('/browse'));
    } 

    render () {
        const { formType, errors } = this.props;

        const formName = formType === 'Sign Up' ? 'Sign Up' : 'Sign In';
        const emailDescClass = this.state.email !== '' ? 'floating-login-description-small' : 'floating-login-description-big'
        const passwordDescClass = this.state.password !== '' ? 'floating-login-description-small' : 'floating-login-description-big'
        const emailError = errors.includes('email') || errors.includes('login') 
                            ? <p className="email-error">Please enter a valid email.</p> 
                            : null;
        const passwordError = errors.includes('password') || errors.includes('login') 
                            ? <p className="password-error">Your password must contain at least 6 characters.</p> 
                            : null;

        return (
            <section className={`login-form-wrapper`}>
                    <section className="login-form-body">
                        <h3>{formName}</h3>
                            
                        <form className="login-form" onSubmit={this.handleSubmit}>
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
                            <label htmlFor="password">
                                <input type="password"
                                    id="password"
                                    onChange={this.handleChange('password')}
                                    value={this.state.password}
                                    className={passwordError ? "password-login error-orange" : 'password-login'}
                                />
                                <span className={passwordDescClass}>Password</span>
                                {passwordError}
                            </label>

                            <input type="submit" value={formName}/>
                        </form>
                        <span className="new-to-netflix-signup">New to Hu'sflix? <Link to="/signup" className="signup-link">Sign up now</Link>.</span>
                    </section>
                    <figure className="black-bg"></figure>
            </section>
            
        )
    }
}

export default LoginForm;