import React from 'react';
import Form from './Form';

export default function Register() {
    const submitHandler = e => {
        e.preventDefault();

        const [ name, pass ] = e.target.querySelectorAll(".auth-input");
        fetch("/register", {
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
                }
            });
    }

    return (
        <div className="register">
            <Form submitHandler={submitHandler} />
        </div>
    );
}
