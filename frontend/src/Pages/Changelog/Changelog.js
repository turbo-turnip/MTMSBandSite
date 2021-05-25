import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Nav from '../../Components/Nav';

export default function Changelog(props) {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ content, setContent ] = useState("");

    useEffect(() => {
        if (loggedIn) {
            fetch("https://mtms-band-site.herokuapp.com/getUserData", {
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
        fetch("https://api.github.com/repos/SoftwareFuze/MTMSBandSite/contents/CHANGELOG.md")
            .then(response => response.json())
            .then(response => {
                setContent(atob(response.content));
            });
    }, []);

    return (
        <div className="changelog">
            <Nav loggedIn={loggedIn} account={accountData} />
            <div className="content">
                {content !== "" && 
                    <ReactMarkdown>
                        {content}
                    </ReactMarkdown>}
            </div>
        </div>
    );
}