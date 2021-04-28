import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Site() {
    return (
        <React.StrictMode>
            <App entry={{ home: "/" }} />
        </React.StrictMode>
    );
}

ReactDOM.render(<Site />, document.querySelector("#root"));