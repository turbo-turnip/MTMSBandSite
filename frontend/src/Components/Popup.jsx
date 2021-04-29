import React, { useState, useEffect } from 'react';

export default function Popup(props) {
    const [ style, setStyle ] = useState({
        background: props.type === "error" ? "#f00" : "#080",
        transform: "translate(-50%, -150%)"
    });

    useEffect(() => {
        style.transform === "translate(-50%, -150%)" && 
            setTimeout(() => setStyle({
                ...style,
                transform: "translate(-50%, 0%)"
            }), 100);
        setTimeout(() => setStyle({
            ...style,
            transform: "translate(-50%, -200%)"
        }), 3000);
    });

    return (
        <div className={`popup popup-${props.type}`} style={style}>
            <h4>{props.message}</h4>
        </div>
    );
}
