import React from 'react';
import Nav from '../../Components/Nav';
import Banner from './Banner';
import Content from './Content';

export default function Home() {
    return (
        <React.Fragment>
            <Nav loggedIn={false} />
            <Banner />
            <Content />
        </React.Fragment>
    );
}
