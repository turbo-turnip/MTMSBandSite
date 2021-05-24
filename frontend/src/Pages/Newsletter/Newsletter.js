import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';

export default function Newsletter(props) {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ newsletters, setNewsletters ] = useState([]);

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
        fetch("https://mtms-band-site.herokuapp.com/getNewsletters")
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    setNewsletters(response.objects);
                }
            });
    }, []);


    return (
        <div className="newsletter-page">
            <Nav loggedIn={loggedIn} account={accountData} />
            <div className="newsletters">
                {(newsletters && newsletters.length === 0) && <h4>No newsletters yet!</h4>}
                {newsletters && newsletters.map(newsletter => 
                    <div className="newsletter" data-date-initialized={newsletter.date} dangerouslySetInnerHTML={{
                        __html: newsletter.content
                    }}></div>)}
            </div>
        </div>
    );
}