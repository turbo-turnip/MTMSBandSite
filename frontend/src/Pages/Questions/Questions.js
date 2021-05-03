import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import Question from './Question';
import QuestionPopup from './QuestionPopup';

export default function Questions() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ questionsLoading, setQuestionsLoading ] = useState(true);
    const [ newQuestionPopup, setNewQuestionPopup ] = useState(false);

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

    const addQuestionHandler = () => {
        setNewQuestionPopup(true);
    }

    const newQuestionHandler = value => {
        if (value ?? value !== "") {
            fetch("/createQuestion", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    from: accountData.name,
                    value
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200) {
                        setNewQuestionPopup(false);
                        setQuestions(response.data);
                    }
                });
        }
    }

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
                    questions.map(question => <Question loggedIn={loggedIn} username={accountData && accountData.name} question={question} />)
                }
            </div>
            {loggedIn ? <button className="new-question" onClick={addQuestionHandler}>Ask a question</button> : <h4></h4>}
            {loggedIn && <QuestionPopup visible={newQuestionPopup} newQuestionHandler={newQuestionHandler} />}
        </div>
    );
}
