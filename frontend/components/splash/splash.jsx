import React from 'react';
import { Link } from 'react-router-dom';

const Splash = props => (
    <>
        <img src={window.splashBg} className="welcome-image"/>
        <div className="splash-wrapper">

            <div className="splash-content-wrapper">
                <section className="splash-content">
                    <h2>See what's next.</h2>
                    <span>Watch Anywhere. Cancel Anytime.</span>

                    <Link to="/signup" className="splash-signup-btn">
                        <h3>Sign Up Today!</h3>
                        <span>&gt;</span>
                    </Link>
                </section>
            </div>
        </div>
    </>
);

export default Splash;