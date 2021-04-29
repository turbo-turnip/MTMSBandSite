import React from 'react';
import { Link } from 'react-router-dom';

export default function Form(props) {
    return (
        <form className="auth-form" onSubmit={props.submitHandler}>
            <h1>Register</h1>
            <div>
                <label className="auth-label">Name</label>
                <input type="text" placeholder="Name..." className="auth-input" required />
            </div>
            <div>
                <label className="auth-label">Password</label>
                <input type="text" placeholder="Password..." className="auth-input" required />
            </div>
            <button type="submit" className="auth-submit">Register</button>
            <Link to="/">Back Home</Link>
        </form>
    );
}
