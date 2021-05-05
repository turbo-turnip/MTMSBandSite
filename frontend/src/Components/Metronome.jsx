import React, { useState, useEffect } from 'react';

export default function Metronome() {
    const [ BPM, setBPM ] = useState(60);
    const [ play, setPlay ] = useState(false);

    useEffect(() => {
        const audio = new Audio("/metronome.mp3");
        const beat = () => {    
            audio.play();
        }
        let interval;
        if (play) {
            interval = setInterval(beat, 60_000 / BPM);
        }
        return () => play && clearInterval(interval);
    }, [BPM, play]);

    return (
        <div className="metronome">
            <h4>{BPM} Beats Per Minute</h4>
            <div>
                <input type="range" min="40" defaultValue={BPM} max="250" onChange={e => setBPM(parseInt(e.target.value))} />
                <button onClick={() => setPlay(!play)}>{play ? "Pause" : "Play"}</button> 
            </div>
        </div>
    );
}
