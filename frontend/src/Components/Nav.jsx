import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const { loggedIn, account } = props;

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
                {loggedIn && <button>{account.name}</button>}
                {!loggedIn && 
                    <div className="auth">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>}
            </div>
        </nav>
    );
}
