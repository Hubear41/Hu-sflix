import React from 'react';
import { Link } from 'react-router-dom';

const Splash = props => (
    <section className="splash-content">
        <h2>See what's next</h2>
        <span>Watch Anywhere. Cancel Anytime.</span>

        <Link to="/signup" className="splash-signup-btn">Sign Up Today!</Link>
    </section>
);

export default Splash;