import React, { useState } from 'react';
import Form from './Form';
import Popup from '../../Components/Popup';

export default function Register() {
    const [ complete, setComplete ] = useState(false);
    const [ error, setError ] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        const [ name, pass ] = e.target.querySelectorAll(".auth-input");
        fetch("https://mtms-band-site.herokuapp.com/login", {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({
                name: name.value,
                pass: pass.value
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    if (localStorage.getItem("ACCESS_TOKEN")) {
                        localStorage.removeItem("ACCESS_TOKEN");
                        localStorage.setItem("ACCESS_TOKEN", response.token);
                    } else localStorage.setItem("ACCESS_TOKEN", response.token);
                    setComplete(true);
                    setTimeout(() => window.location.href = "/", 3100);
                } else {
                    setError('Invalid name or password.');
                    setTimeout(() => window.location.reload(), 3100);
                }
            });
    }

    return (
        <div className="login">
            <Form submitHandler={submitHandler} />
            {complete && <Popup type="success" message="Successfully logged in!" />}
            {error !== '' && <Popup type="error" message={error} />}
        </div>
    );
}
