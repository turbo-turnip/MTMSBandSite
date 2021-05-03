import React from 'react';

export default function Question(props) {
    const { question } = props;

    const replyHandler = e => {

    }

    return (
        <div className="question" data-user={question.from}>
            <h4>{question.question.trim().replace(/\n| {2}|/gm, '')}</h4>
            <button 
                className="question-reply" 
                onClick={replyHandler} 
                data-replies={`${question.replies.length} repl${question.replies.length !== 1 ? "ies" : "y"}`}
            >Reply</button>
        </div>
    );
}
