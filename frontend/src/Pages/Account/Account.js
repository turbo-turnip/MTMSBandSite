import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';

export default function Questions() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});

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

    const newUsernameHandler = (newUsername, password) => {
        if (newUsername !== "" && password !== "") {
            fetch("/newUsername", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    currUsername: accountData.name,
                    newUsername,
                    password
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200) {
                        setAccountData(response.newData);
                        localStorage.removeItem("USER_TOKEN");
                        window.location.href = "/login";
                    }
                });
        }
    }

    const deleteAccountHandler = () => {
        if (window.confirm("Are you sure you want to delete your account? This action can't be undone.")) {
            fetch("/deleteAccount", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    username: accountData.name
                })
            })  
                .then(response => response.json())
                .then(response => {
                    localStorage.removeItem("USER_TOKEN");
                    window.location.href = "/register";
                });
        }
    }

    return (
        <div className="account">
            <Nav loggedIn={loggedIn} account={accountData} />
            <h1 className="header">{loggedIn ? accountData.name : "Register to create an account."}</h1>
            {loggedIn && 
                <React.Fragment>
                    <h4>Change Username</h4>
                    <input placeholder="New username..." />
                    <input placeholder="Password..." />
                    <button onClick={e => newUsernameHandler(e.target.previousSibling.previousSibling.value, e.target.previousSibling.value)}>Change</button>
                    <button onClick={deleteAccountHandler}>Delete Your Account</button>
                </React.Fragment>
            }
        </div>
    );
}