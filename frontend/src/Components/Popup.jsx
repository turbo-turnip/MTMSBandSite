import React from 'react';

export default function Popup(props) {
    return (
        <div className="popup" style={{ background: 
            props.type === 'success' ? '#13a103' :
            props.type === 'error' ? '#e64545' : null }}>
            <h4>{props.message}</h4>
        </div>
    );
}
