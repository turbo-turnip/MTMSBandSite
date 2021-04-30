import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const { loggedIn, account } = props;

    const logOutHandler = () => {
        localStorage.hasOwnProperty("ACCESS_TOKEN") && localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/";
    }

    return (
        <nav className="nav">
            <div className="logo">
                <img src="logo.png" alt="MTMS Band Site" />
                <h4>MTMS Band</h4>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/instruments">Instruments</Link>
                <Link to="/contact">Contact</Link>
                {loggedIn && 
                    <details className="account-nav">
                        <summary>{account.name}</summary>
                        <button onClick={logOutHandler}>Log Out</button>
                    </details>}
                {!loggedIn && 
                    <div className="auth">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>}
            </div>
        </nav>
    );
}
