import React from 'react';

export default function Time(props) {
    const { time } = props;

    return (
        <div className="time">
            <h4>{time.name} — {time.time} minutes!</h4>
            <p>Instrument: {time.instrument}</p>
        </div>
    );
}
