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
                    <a href="hubear41.github.io" target='new' className="website-symbol">
                        <i className="fas fa-user-circle"></i>
                    </a>
                    <a href="https://github.com/Hubear41" target='new' className="github-symbol">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/dennisdhu/" target='new' className='linkedin-symbol'>
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://angel.co/dennis-hu-1?public_profile=1" target='new' className='angel-symbol'>
                        <i className="fab fa-angellist"></i>
                    </a>

                </footer>
            // </section>
        );
    }
}

export default withRouter(Footer);