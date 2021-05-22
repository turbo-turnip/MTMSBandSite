import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const { loggedIn, account } = props;
    const [ navActivated, setNavActivated ] = useState(false);
    const navLinksRef = useRef();

    const logOutHandler = () => {
        localStorage.hasOwnProperty("ACCESS_TOKEN") && localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/";
    }

    const toggleNav = () => {
        if (navActivated) {
            navLinksRef.current.style.transform = "translateX(100%)";
            setNavActivated(false);
        } else {
            navLinksRef.current.style.transform = "translateX(0%)";
            setNavActivated(true);
        }
    }

    return (
        <nav className="nav">
            <div className="logo">
                <img src="logo.png" alt="MTMS Band Site" />
                <h4>MTMS Band</h4>
            </div>
            <div className="nav-links" ref={navLinksRef}>
                <Link to="/">Home</Link>
                <Link to="/newsletter">Newsletter</Link>
                <Link to="/instruments">Resources</Link>
                <Link to="/questions">Questions</Link>
                {loggedIn && 
                    <details className="account-nav">
                        <summary>{account.name}</summary>
                        <div className="account-nav-dropdown">
                            <button>
                                <Link to="/account">
                                    Account
                                </Link>
                            </button>
                            <button onClick={logOutHandler}>Log Out</button>
                        </div>
                    </details>}
                {!loggedIn && 
                    <div className="auth">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>}
            </div>
            <div className="burger" onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}
