import React, { useState, useRef } from 'react';

export default function Question(props) {
    const { question, loggedIn, username } = props;
    const [ replies, setReplies ] = useState(question.replies);
    const [ newReply, setNewReply ] = useState(false);
    const replyRef = useRef();

    const createReplyHandler = () => {
        if (!loggedIn) window.location.href = "/register";
        else {
            if (!replyRef.current.hasAttribute('open')) replyRef.current.open = true;
            setNewReply(true);
        }
    }

    const replyHandler = e => {
        if (e.target.previousSibling.value !== "") {
            fetch("https://mtms-band-site.herokuapp.com/reply", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    from: username,
                    reply: String(e.target.previousSibling.value),
                    question: {
                        from: question.from,
                        question: question.question
                    }
                })
            })
                .then(response => response.json())
                .then(response => {
                    response.status === 200 && setReplies(response.replies);
                    setNewReply(false);
                });
        }
    }

    return (
        <div className="question" data-user={question.from}>
            <h4>{question.question.trim().replace(/\n| {2}|\r/gm, ' ')}</h4>
            <button 
                className="question-reply" 
                onClick={createReplyHandler} 
                data-replies={`${question.replies.length} repl${question.replies.length !== 1 ? "ies" : "y"}`}
            >{loggedIn ? "Reply" : "Register to reply!"}</button>
            <details ref={replyRef}>
                <summary>{loggedIn ? 'Replies' : 'Register to view all replies!'}</summary>
                {(newReply && loggedIn) && 
                            <div className="reply-create-box">
                                <textarea className="reply-textarea" placeholder="reply..."></textarea>
                                <button onClick={e => replyHandler(e)} className="reply-submit">Reply</button>
                            </div>}
                {loggedIn && replies.map(reply => 
                    <div className="question-live-reply" data-user={reply.from} key={reply.form + " " + reply.reply}>
                        <h4>{reply.reply}</h4>
                    </div>)}
                {(loggedIn && replies.length === 0 && !newReply) && <h4 style={{ marginTop: ".5em", textAlign: "center" }}>No replies!</h4>}
            </details>
        </div>
    );
}
