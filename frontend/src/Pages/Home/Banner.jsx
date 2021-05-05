import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <section className="banner">
            <div className="strike-through"></div>
            <div className="banner-content">
                <h1>Welcome to MTMS Band's Website!</h1>
                <h4>Here you will find sheet music, fingering charts, newsletters, private teacher contacts, and a lot more! To find more info on your instrument, click the link below.</h4>
                <Link to="/instruments">Instrument Information</Link>
            </div>
        </section>
    );
}