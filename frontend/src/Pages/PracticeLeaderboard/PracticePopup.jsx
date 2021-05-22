import React, { useState } from 'react';

export default function PracticePopup(props) {
    const [ inValidTime, setInValidTime ] = useState(false);
    const [ minutes, setMinutes ] = useState(0);

    const timeHandler = e => {
        setMinutes(e.target.value);
        if (e.target.value > 240) return setInValidTime("You couldn't have practiced that long.");
        if (e.target.value < 30) return setInValidTime("That isn't a qualifying time."); 

        return setInValidTime(false);
    }

    return (
        <div className="practice-time-popup" style={{ display: props.visible ? "flex" : "none" }}>
            <h1>Practice Time</h1>
            <input type="number" placeholder="Practice time in minutes..." onInput={e => timeHandler(e)} required />
            <select>
                <option>Clarinet</option>
                <option>Bassoon</option>
                <option>Trumpet</option>
                <option>French Horn</option>
                <option>Saxophone</option>
                <option>Flute</option>
                <option>Oboe</option>
                <option>Tuba</option>
                <option>Trombone</option>
                <option>Bass</option>
                <option>Euphonium</option>
                <option>Percussion</option>
            </select>
            {inValidTime && <p>{inValidTime}</p>}
            <button className="time-submit" onClick={e => props.newTimeHandler(e.target.previousSibling.previousSibling)}>Submit Time {!inValidTime && ` - ${minutes} mins`}</button>
        </div>
    );
}