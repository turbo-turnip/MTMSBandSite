import './main.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// page components
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Instruments from './Pages/Instruments/Instruments';
import Brass from './Pages/Instruments/Brass/Brass';
import Woodwind from './Pages/Instruments/Woodwind/Woodwind';
import Percussion from './Pages/Instruments/Percussion/Percussion';
import Questions from './Pages/Questions/Questions';
import Practice from './Pages/PracticeLeaderboard/Practice';
import Account from './Pages/Account/Account';
import Console from './Pages/Admin/Console';

export default function App(props) {
    const { entry } = props;

    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path={entry.home} component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/instruments" component={Instruments} />
                    <Route exact path="/brass" component={Brass} />
                    <Route exact path="/woodwind" component={Woodwind} />
                    <Route exact path="/percussion-bass" component={Percussion} />
                    <Route exact path="/questions" component={Questions} />
                    <Route exact path="/practice-leaderboard" component={Practice} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/admin" component={Console} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}