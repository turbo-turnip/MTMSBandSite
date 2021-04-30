import './main.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// page components
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';


export default function App(props) {
    const { entry } = props;
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path={entry.home} component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}