import React, { useEffect, useState } from 'react';

export default function Stats(props) {
    const [ loaded, setLoaded ] = useState(false);
    const [ stats, setStats ] = useState({});

    useEffect(() => {
        fetch("https://mtms-band-site.herokuapp.com/getStats")
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    setLoaded(true);
                    setStats(response.object);
                }
            });
    }, []);

    return (
        <div className="admin-stats">
            {(loaded && stats !== {}) && 
                <React.Fragment>
                    <h1>Operating Systems</h1>
                    <div className="oss">
                        {stats.operatingSystems && stats.operatingSystems.map(os => 
                            <div className="os">
                                <h4>{os.System}</h4>
                                <span>Visits: {os.visits}</span>
                            </div>)}
                    </div>
                    <h4>Most popular Operating System: {stats.mostPopularOS && stats.mostPopularOS.System} with {stats.mostPopularOS && stats.mostPopularOS.visits} visits.</h4>

                    <h1>Web Browsers</h1>
                    <div className="browsers">
                        {stats.webBrowsers && stats.webBrowsers.map(browser => 
                            <div className="browser">
                                <h4>{browser.Name}</h4>
                                <span>Visits: {browser.visits}</span>
                            </div>)}
                    </div>
                    <h4>Most popular Web Browser: {stats.mostPopularWebBrowser && stats.mostPopularWebBrowser.Name} with {stats.mostPopularWebBrowser && stats.mostPopularWebBrowser.visits} visits.</h4>
                </React.Fragment>}
        </div>
    );
}
