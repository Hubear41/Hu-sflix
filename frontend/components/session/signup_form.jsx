import React from "react";
import { Link, withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .createUser(this.state)
      .then(() => this.props.history.push("/browse"))
      .then(() => this.props.startLoading());
  }

  // logs into the guest user's account
  handleGuestSubmit(e) {
    e.preventDefault();
    const guest = { email: "guest@guest.com", password: "go_password_go" };
    this.props.loginUser(guest).then(() => this.props.history.push("/browse"));
  }

  render() {
    const { errors } = this.props;
    // if the input field is just an empty string, display 'Email' or 'Password'
    // if there are characters, put the input description to the topleft
    const emailDescClass =
      this.state.email !== ""
        ? "floating-signup-description-small"
        : "floating-signup-description-big";
    const passwordDescClass =
      this.state.password !== ""
        ? "floating-signup-description-small"
        : "floating-signup-description-big";

    // users controller will send back either 'email', 'password', or 'signup' error types
    // will respond with a message based on the error.
    let emailError = null;

    if (errors.includes("email")) {
      emailError = (
        <p className="signup-email-error">Please enter a valid email.</p>
      );
    } else if (errors.includes("signup")) {
      emailError = <p className="signup-email-error">Email is taken.</p>;
    }

    const passwordError = errors.includes("password") ? (
      <p className="signup-password-error">
        Your password must contain at least 6 characters.
      </p>
    ) : null;

    return (
      <section className="signup-form-wrapper">
        <section className="signup-form-content">
          <button
            onClick={this.handleGuestSubmit}
            type="button"
            className="signup-guest-login-btn"
          >
            Guest Login
          </button>

          <section className="signup-texts">
            <h4>Sign up to start your free account</h4>
            <p>Just two more steps and you're done! We hate paperwork, too.</p>
            <h5>Create Your Account.</h5>
          </section>

          <form className="signup-form" onSubmit={this.handleSubmit}>
            <section className="signup-inputs">
              <label htmlFor="email">
                <input
                  type="text"
                  id="email"
                  onChange={this.handleChange("email")}
                  value={this.state.email}
                  className={
                    emailError ? "email-signup error-red" : "email-signup"
                  }
                />
                <span className={emailDescClass}>Email</span>
                {emailError}
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange("password")}
                  value={this.state.password}
                  className={
                    passwordError
                      ? "password-signup error-red"
                      : "password-signup"
                  }
                />
                <span className={passwordDescClass}>Password</span>
                {passwordError}
              </label>
            </section>

            <input type="submit" value="Continue" />
          </form>
        </section>
      </section>
    );
  }
}

export default withRouter(SignupForm);
