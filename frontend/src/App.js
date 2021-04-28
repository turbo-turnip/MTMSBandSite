import '../main.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


export default function App(props) {
    const { entry } = props;
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path={entry.home} component={Home} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}