import React from "react";
import Footer from "../footer/footer";
import { Link, withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
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
    const { email, password } = this.state;

    const user = { email, password };
    this.props
      .loginUser(user)
      .then(() => this.props.history.push("/browse"))
      .then(() => this.props.startLoading());
  }

  handleGuestSubmit(e) {
    e.preventDefault();
    const guest = { email: "guest@guest.com", password: "go_password_go" };
    this.props.loginUser(guest).then(() => this.props.history.push("/browse"));
  }

  togglePassword(e) {
    e.preventDefault();
    this.setState({ showing: !this.state.showing });
  }

  render() {
    const { formType, errors } = this.props;

    const formName = formType === "Sign Up" ? "Sign Up" : "Sign In";

    const emailDescClass =
      this.state.email !== ""
        ? "floating-login-description-small"
        : "floating-login-description-big";

    let passwordDescClass, hiddenClass;
    if (this.state.password !== "") {
      passwordDescClass = "floating-login-description-small";
      hiddenClass = "";
    } else {
      passwordDescClass = "floating-login-description-big";
      hiddenClass = "hidden-show-hide";
    }

    const emailError = errors.includes("email")
      ? "Please enter a valid email."
      : "";
    const passwordError = errors.includes("password")
      ? "Your password must contain at least 6 characters."
      : "";
    const logininError = errors.includes("login") ? (
      <p className="login-error">
        Sorry, we can't find an account with this email address. Please try
        again or{" "}
        <Link to="/signup" className="create-new-account-link">
          create a new account
        </Link>
        .
      </p>
    ) : null;

    let togglePasswordBtn, passwordIptType;
    if (this.state.showing) {
      togglePasswordBtn = "HIDE";
      passwordIptType = "text";
    } else {
      togglePasswordBtn = "SHOW";
      passwordIptType = "password";
    }

    return (
      <>
        <section className="splash-wrapper">
          <img
            src={window.splashBg}
            alt="Husflix Background"
            className="background-image"
          />
          <section className="login-container">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <h3 className="login-header">{formName}</h3>

              {logininError}
              <label htmlFor="email">
                <input
                  type="text"
                  id="email"
                  onChange={this.handleChange("email")}
                  value={this.state.email}
                  className={
                    emailError ? "email-login error-orange" : "email-login"
                  }
                />
                <span className={emailDescClass}>Email</span>
                <p className="email-error">{emailError}</p>
              </label>

              <div className="password-wrapper">
                <label
                  htmlFor="password"
                  className={
                    passwordError
                      ? "password-login error-orange"
                      : "password-login"
                  }
                  onClick={e => document.getElementById("password").focus()}
                >
                  <input
                    type={passwordIptType}
                    id="password"
                    onChange={this.handleChange("password")}
                    value={this.state.password}
                  />
                </label>
                <span className={`${passwordDescClass} password-move`}>
                  Password
                </span>
                <p className="password-error">{passwordError}</p>

                <button
                  type="button"
                  className={`${hiddenClass} toggle-show-hide`}
                  onClick={this.togglePassword}
                >
                  {togglePasswordBtn}
                </button>
              </div>

              <input
                className="login-form-btn"
                type="submit"
                value={formName}
              />
              <button
                type="button"
                onClick={this.handleGuestSubmit}
                className="login-guest-btn login-form-btn"
              >
                Guest Login
              </button>
            </form>

            <span className="new-to-netflix-signup">
              New to Hu'sflix?{" "}
              <Link to="/signup" className="signup-link">
                Sign up now
              </Link>
              .
            </span>
          </section>
        </section>
        <Footer />
      </>
    );
  }
}

export default withRouter(LoginForm);
