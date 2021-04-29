import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import Banner from './Banner';
import Content from './Content';

export default function Home() {
    const loggedIn = localStorage.hasOwnProperty("ACCESS_TOKEN");
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
                    else loggedIn = false;
                });
        }
    });

    return (
        <React.Fragment>
            <Nav loggedIn={loggedIn} account={accountData} />
            <Banner />
            <Content />
        </React.Fragment>
    );
}
