import React, { useState, useEffect, useRef } from 'react';

export default function Auth(props) {
    const [ unauthorized, setUnauthorized ] = useState(false);
    const adminUsernameRef = useRef();
    const adminPassRef = useRef();
    const databaseIdRef = useRef();


    const authorizeHandler = e => {
        e.preventDefault();

        fetch("https://mtms-band-site.herokuapp.com/authenticateAdmin", {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({
                adminUser: adminUsernameRef.current.value,
                adminPass: adminPassRef.current.value,
                dbId: databaseIdRef.current.value
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    props.successFn(response.adminUser);
                    setUnauthorized(false);
                } else setUnauthorized(true);
            });
    }

    useEffect(() => {
        if (unauthorized)
            setTimeout(() => window.location.reload(), 1500);
    }, [ unauthorized ]);

    return (
        <div className="admin-auth">
            {unauthorized && <h4>Unauthorized!</h4>}
            <form className="auth-form" onSubmit={e => authorizeHandler(e)}>
                <h1>Authorize</h1>
                <div>
                    <label className="auth-label">Admin User</label>
                    <input ref={adminUsernameRef} type="text" placeholder="Admin Username..." className="auth-input" required />
                </div>
                <div>
                    <label className="auth-label">Admin Pass</label>
                    <input ref={adminPassRef} type="text" placeholder="Admin Password..." className="auth-input" required />
                </div>
                <div>
                    <label className="auth-label">Database ID</label>
                    <input ref={databaseIdRef} type="text" placeholder="Database ID..." className="auth-input" required />
                </div>
                <button type="submit" className="auth-submit">Authorize</button>
            </form>
        </div>
    );
}