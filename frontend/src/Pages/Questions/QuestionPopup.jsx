import React, { useState, useEffect } from 'react';

export default function QuestionPopup(props) {
    const [ badWords, setBadWords ] = useState([]);
    const [ isAppropriate, setIsAppropriate ] = useState(true);

    useEffect(() => {
        fetch("/badwords")
            .then(response => response.json())
            .then(response => setBadWords(response.badwords));
    }, [ badWords ]);

    const checkAppropriate = e => {
        e.target.style.height = e.target.scrollHeight + "px";
        let containsBadWord = false;
        const words = e.target.value.split(/ |\n/gm);
        for (let i = 0; i < words.length; ++i)
            if (badWords.indexOf(words[i]) > -1) containsBadWord = true;
        containsBadWord ? setIsAppropriate(false) : setIsAppropriate(true);
    }

    return (
        <div className="new-question-popup" style={{ display: props.visible ? "flex" : "none" }}>
            <h1>New Question</h1>
            <textarea placeholder="Your question..." onChange={checkAppropriate}></textarea>
            <p>{!isAppropriate && "Please stay on-topic and school appropriate."}</p>
            <button className="question-submit" disabled={!isAppropriate} style={{ cursor: isAppropriate ? "pointer" : "not-allowed" }} onClick={e => props.newQuestionHandler(e.target.previousSibling.previousSibling.value)}>Submit</button>
        </div>
    );
}