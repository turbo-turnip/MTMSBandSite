import React, { useState } from 'react';

export default function HomePopup(props) {
    const [ visible, setVisible ] = useState(true);
    const [ showTutorial, setShowTutorial ] = useState(false);

    const dontShowAgainHandler = () => {
        setVisible(false);
        localStorage.setItem("showPopup", false);
    }

    return (
        <React.Fragment>
            {showTutorial && 
                <div className="tutorial">
                    <span onClick={() => setShowTutorial(false)}>&times;</span>
                    <iframe src="https://drive.google.com/file/d/1y-qi_DJIFi_jm9ptQA2uCvxSEAKhA6_D/preview" width="640" height="480"></iframe>
                </div>}
            <div className="home-popup" style={{
                transform: visible ? 'scaleY(1)' : 'scaleY(0)'
            }}>
                <span onClick={() => setVisible(false)}>&times;</span>
                <button className="dont-show" onClick={dontShowAgainHandler}>Don't Show This Again</button>
                <h4>New to MTMSBandSite?</h4>
                <p>Watch the tutorial to become more farmiliar with MTMSBandSite and learn how all the features work. Get to know your band website!</p>
                <button onClick={() => setShowTutorial(true)}>Watch Tutorial</button>
            </div>
        </React.Fragment>
    );
}