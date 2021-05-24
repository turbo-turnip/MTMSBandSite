import React, { useState } from 'react';
import Auth from './Auth';
import Stats from './Stats/Stats';
import Newsletter from './Newsletter/Newsletter';

export default function Console(props) {
    const [ adminUsername, setAdminUsername ] = useState("");
    const [ authorized, setAuthorized ] = useState(false);
    const [ category, setCategory ] = useState(null);

    const handleSuccess = username => {
        setAuthorized(true);
        setAdminUsername(username);
    }

    return (
        <div className="admin-console">
            {!authorized && <Auth successFn={handleSuccess} />}
            {authorized && 
                <React.Fragment>
                    <h1 className="header">MTMSBandSite Admin Console 2.5.1</h1>
                    <h2>Welcome {adminUsername.replace(/_/gm, ' ')}!</h2>
                    <div className="categories">
                        <div className="category category-1" onClick={() => setCategory(1)}>
                            <span>Stats</span>
                            <img src="https://img.icons8.com/fluent/48/000000/statistics-report.png"/>
                        </div>
                        <div className="category category-2" onClick={() => setCategory(2)}>
                            <span>Newsletter</span>
                            <img src="https://img.icons8.com/fluent/48/000000/subscription.png"/>
                        </div>
                        <div className="category category-3" onClick={() => setCategory(3)}>
                            <span>Manage Database</span>
                            <img src="https://img.icons8.com/ios/50/4a90e2/data-configuration.png"/>
                        </div>
                    </div>
                    {category === 1 && <Stats />}
                    {category === 2 && <Newsletter />}
                </React.Fragment>}
        </div>
    );
}