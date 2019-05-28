import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    } 

    render () {
        const { formType, errors } = this.props;

        const errorsList = errors ? errors.map( error => {
            return <li>{error}</li>
        }) : null;

        return (
            <section>
                <h3>{formType}</h3>
                <ul>
                    {errorsList}
                </ul>
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input type="text"
                            onChange={this.handleChange('email')}
                            value={this.state.email}
                        />
                    </label>
                    <label>Password:
                        <input type="password"
                            onChange={this.handleChange('password')}
                            value={this.state.password}
                        />
                    </label>

                    <input type="submit" value={formType}/>
                </form>
            </section>
            
        )
    }
}

export default SessionForm;