import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    const bannerContentRef = useRef();
    const strikeThroughRef = useRef();

    const handleMouseMove = e => {
        bannerContentRef.current.style.right = Math.floor(e.pageX / 60) + "px";
        bannerContentRef.current.style.top = -Math.floor(e.pageY / 40) + "px";
        strikeThroughRef.current.style.transform = `skew(-20deg) translateX(calc(20% - ${e.pageX / 20}px))`;
    }

    return (
        <section className="banner" onMouseMove={e => handleMouseMove(e)}>
            <div className="strike-through" ref={strikeThroughRef}></div>
            <div className="banner-content" ref={bannerContentRef}>
                <h1>Welcome to MTMS Band's Website!</h1>
                <h4>Here you will find sheet music, fingering charts, newsletters, private teacher contacts, and a lot more! To find more info on your instrument, click the link below.</h4>
                <Link to="/instruments">Instrument Information</Link>
            </div>
        </section>
    );
}