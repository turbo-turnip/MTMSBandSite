import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <section className="banner">
            <div className="strike-through"></div>
            <div className="banner-content">
                <h1>Welcome to MTMS Band's Website!</h1>
                <h4>Here you will find sheet music, audio recordings, fingering charts, concert dates, private teacher contacts and more! To find more info on your instrument, click the link below.</h4>
                <Link to="/instruments">Instrument Information</Link>
            </div>
        </section>
    );
}