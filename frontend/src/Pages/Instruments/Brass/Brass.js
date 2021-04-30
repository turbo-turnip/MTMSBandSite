import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../../Components/Nav';

export default function Brass() {
    let loggedIn = localStorage.hasOwnProperty("ACCESS_TOKEN");
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
    });

    return (
        <React.Fragment>
            <Nav loggedIn={loggedIn} account={accountData} />
            <div className="instruments">
                <div className="options">
                    <div className="instrument">
                        <Link>Trombone</Link>
                        <div className="img">
                            <img alt="" src="https://d1aeri3ty3izns.cloudfront.net/media/22/228735/600/preview_1.jpg" />
                        </div>
                    </div>
                    <div className="instrument">
                        <Link>Tuba</Link>
                        <div className="img">
                            <img alt="" src="https://d1aeri3ty3izns.cloudfront.net/media/26/262168/600/preview.jpg" />
                        </div>
                    </div>
                    <div className="instrument">
                        <Link>Trumpet</Link>
                        <div className="img">
                            <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/71l6xKqHLCL._AC_SL1500_.jpg" />
                        </div>
                    </div>
                    <div className="instrument">
                        <Link>Euphonium</Link>
                        <div className="img">
                            <img alt="" src="https://t4.ftcdn.net/jpg/03/53/84/83/360_F_353848334_XdybCsqa6FzqbOEtqUntQ8Vs1ubJDIqb.jpg" />
                        </div>
                    </div>
                </div>
                <h1>Pick the instrument that you are playing in band!</h1>
            </div>
        </React.Fragment>
    );
}
