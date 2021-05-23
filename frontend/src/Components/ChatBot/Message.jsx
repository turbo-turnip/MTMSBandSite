import React, { useEffect, useRef, useState } from 'react';

export default function Message(props) {
    const [ messageProcessed, setMessageProcessed ] = useState("");
    const messageRef = useRef();

    useEffect(() => {
        setMessageProcessed(props.message.message.replace(/https\:\/\//gm, '<a href="https://'));
        setMessageProcessed(prevState => prevState.replace(/\!\!/gm, '">by clicking this link!</a>'));
        messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []); 

    return (
        <div ref={messageRef} className={`message ${props.isBot ? 'bot-message' : 'user-message'}`}>
            <span dangerouslySetInnerHTML={{
                __html: messageProcessed
            }}></span>
        </div>
    );
}