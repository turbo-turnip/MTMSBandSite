import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import Question from './Question';

export default function Questions() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ questionsLoading, setQuestionsLoading ] = useState(true);

    useEffect(() => {
        if (loggedIn) {
            fetch("/getUserData", {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
                }
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200)
                        setAccountData(response.data);
                    // eslint-disable-next-line
                    else loggedIn = false;
                });
        }
    }, [ loggedIn ]);

    useEffect(() => {
        fetch("/getQuestions")
            .then(response => response.json())
            .then(response => {
                setQuestionsLoading(false);
                response.status === 200 && setQuestions(response.questions);
            });
    }, [ questions ]);

    return (
        <div className="questions">
            <Nav loggedIn={loggedIn} account={accountData} />
            <h1>Questions</h1>
            <div className="questions-section">
                {
                    questionsLoading ? <h4>Loading...</h4> : 
                    questions.length === 0 ? 
                        <React.Fragment>
                            <h4>No questions yet!</h4>
                            <p>Be the first to ask a question!</p>
                        </React.Fragment> :
                    questions.map(question => <Question question={question} />)
                }
            </div>
            <button className="new-question">Ask a question</button>
        </div>
    );
}
