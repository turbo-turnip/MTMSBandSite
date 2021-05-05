import React, { useState, useEffect } from 'react';

export default function PracticePopup(props) {
    const [ minutes, setMinutes ] = useState(0);
    const [ isValidTime, setIsValidTime ] = useState(true);

    useEffect(() => {
        if (parseInt(minutes) > 300) {
            setIsValidTime(false);
        }
    }, [ minutes ]);

    return (
        <div className="practice-time-popup" style={{ display: props.visible ? "flex" : "none" }}>
            <h1>Practice Time {(minutes !== 0 && Math.round(minutes) > 29) && `— ${minutes} min`}</h1>
            <input type="number" placeholder="Practice time in minutes..." onChange={e => setMinutes(e.target.value)} required />
            <input placeholder="Instrument..." required />
            {!isValidTime && <p>You couldn't have practiced that long...</p>}
            {(minutes !== 0 && minutes < 30) && <p>That isn't a qualifying time...</p>}
            <button className="time-submit" onClick={e => props.newTimeHandler(e.target.previousSibling.previousSibling)}>Submit Time</button>
        </div>
    );
}