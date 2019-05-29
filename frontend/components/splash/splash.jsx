import React from 'react';
import { Link } from 'react-router-dom';

const Splash = props => (
    <div className="splash-wrapper">
        {/* <img src="movie_collage.jpg" alt=""/> */}

        <section className="splash-content">
            <h2>See what's next.</h2>
            <span>Watch Anywhere. Cancel Anytime.</span>

            <Link to="/signup" className="splash-signup-btn">
                <h3>Sign Up Today!</h3>
                <span>&gt;</span>
            </Link>
        </section>
    </div>
);

export default Splash;