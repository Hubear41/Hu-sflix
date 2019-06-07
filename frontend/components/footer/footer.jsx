import React from 'react'
import { withRouter } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        const { location } = this.props;
        
        if ( location.pathname.includes("/watch") ) {
            return null;
        }

        return (
            // <section className="footer-positioning">
                <footer className="husflix-footer">
                    <a href="" className="website-symbol">
                        <i className="fas fa-ghost"></i>
                    </a>
                    <a href="https://github.com/Hubear41" className="github-symbol">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/dennisdhu/" className='linkedin-symbol'>
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </footer>
            // </section>
        );
    }
}

export default withRouter(Footer);