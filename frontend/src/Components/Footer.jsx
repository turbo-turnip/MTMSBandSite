import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    return (
        <footer className="footer">
            <h4>MTMS Band Site 2.5.1</h4>
            <div className="sections">
                <div className="section">
                    <h4>Credits</h4>
                    <p>Site created by Atticus Curtis</p>
                    <p>My Portfolio: <a href="https://softwarefuze.ml">softwarefuze.com</a></p>
                    <p>Discord Account: <span>✨ TeaKe_smAL ✨#4826</span></p>
                    <p>Github Account: <a href="https://github.com/SoftwareFuze/">SoftwareFuze</a></p>
                    <p>Codepen Account: <a href="https://codepen.io/teake_smal/">TeaKe_smAL</a></p>
                    <p>Contact me at: <a href="mailto:att.cubing.sharks@gmail.com">att.cubing.sharks@gmail.com</a></p>
                </div>
                <div className="section">
                    <h4>Site Resources</h4>
                    <p>Github Repo: <a href="https://github.com/SoftwareFuze/MTMSBandSite">Backend</a></p>
                    <p>Github Repo: <a href="https://github.com/SoftwareFuze/MTMSBandSite-Frontend">Frontend</a></p>
                    <p>Changelog: <Link to="/changelog">mtmsband.netlify.app/changelog</Link></p>
                    <p>Site Created with 💛 and the ERN stack. (Express, ReactJS, and NodeJS)</p>
                    <p>Need me to build your site? Email me at <a href="mailto:att.cubing.sharks@gmail.com">att.cubing.sharks@gmail.com</a>!</p>
                </div>
            </div>
        </footer>
    );
}
