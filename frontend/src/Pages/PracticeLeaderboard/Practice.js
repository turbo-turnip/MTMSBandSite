import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import PracticePopup from './PracticePopup';
import Time from './Time';

export default function Practice() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ newPracticePopup, setNewPracticePopup ] = useState(false);
    const [ top100, setTop100 ] = useState([]);
    const [ top50, setTop50 ] = useState([]);
    const [ top10, setTop10 ] = useState([]);

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
    }, []);

    useEffect(() => {
        fetch("/times")
            .then(response => response.json())
            .then(response => {
                setTop100(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 100));
                setTop50(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 50));
                setTop10(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 10));
            });
    }, []);

    const addTimeHandler = () => {
        setNewPracticePopup(true);
    }

    const newTimeHandler = input => {
        if (input.value && input.nextSibling.value !== "") {
            fetch("/createTime", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    name: accountData.name,
                    instrument: input.nextSibling.value,
                    time: parseInt(input.value)
                })
            })
                .then(response => response.json())
                .then(response => {
                    setNewPracticePopup(false);
                    if (response.status === 200) {
                        setTop100(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 100));
                        setTop50(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 50));
                        setTop10(response.times.sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 10));
                    }
                });
        } 
    }

    return (
        <section className="practice-leaderboard">
            <Nav loggedIn={loggedIn} account={accountData} />
            {loggedIn && <button className="new-time" onClick={addTimeHandler}>Submit Practice Time</button>}
            <h1>Practice Leaderboard (Top 10 Times)</h1>
            <div className="times">
                {top10.map(time => <Time time={time} key={time.time + " " + time.name} />)}
            </div>
            <h1>Practice Leaderboard (Top 50 Times)</h1>
            <div className="times">
                {top50.map(time => <Time time={time} key={time.time + " " + time.name} />)}
            </div>
            <h1>Practice Leaderboard (Top 100 Times)</h1>
            <div className="times">
                {top100.map(time => <Time time={time} key={time.time + " " + time.name} />)}
            </div>
            {loggedIn && <PracticePopup visible={newPracticePopup} newTimeHandler={newTimeHandler} />}
        </section>
    );
}