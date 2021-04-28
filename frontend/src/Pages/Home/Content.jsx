import React from 'react';
import Metronome from '../../Components/Metronome';

export default function Content() {
    return (
        <main>
            <h1>Metronome</h1>
            <Metronome />
            
            <h1>Tips For Practicing At Home</h1>
            <h4>Musicians always practice with a tuner and a metronome</h4>
            <h4>Recommended practive time per week: 80 - 120 minutes</h4>
            <ol>
                <li>
                    <span>Warm-up:</span> Just like an athlete warms up to avoid injury and prepare to play the best game ever, musicians need to warm-up their embouchure and hands. <span>Long Tones:</span> 3-5 minutes per day. Play every note you have learned for one full breath. Strive for a relaxed, smooth, and even sound. Use a tuner if you have one. Intermediate level players add crescendo and decrescendo to long tones. Advanced players add vibrato. Percussion long tones are snare rolls, with dynamics. Electric Bass, use this time for scales instead. Upright basses, use the bow for long tones - check your pitch with the tuner. <span>On your busiest day, at least play long tones, even if you don’t have time for anything else! Everyone can find 3-5 minutes!</span>
                </li>
                <li>
                    <span>Technique Builders:</span> Scales, rudiments, ornaments, 3-5 minutes per day. (more for some players, like bassists and jazz players). Practice a variety of <span>scales and/or technique exercises</span> in the book slowly and carefully.  It is much more important to play something correctly than to play it fast and sloppily. 
                </li>
                <li>
                    <span>Band Music Focused Practice: Find the hard part!</span> 12 to 25 minutes per day.This is the part you have been working towards. Find the two or six measures of each piece that are difficult for you.  Slow the tempo down to learn the correct notes and rhythms.  Play that same spot slowly until it is right, and then GRADUALLY speed up the tempo.  (When you can play it perfectly 4 times in a row, you can move the metronome setting up one or two clicks.) Don’t worry if it isn’t at performance tempo at the end of the week, it will get there.
                </li>
                <li>
                    <span>Finish With Something Fun - find an audience!</span> Pull out that tune that you really like and play well, and jam on it!  Remember that practicing with friends is more fun, and if you are following the steps above, still counts for practice time. Plus, the time goes by quickly and you can help each other with challenging sections. When you’re done, carefully clean your instrument and put it away, fill out your practice sheet and say ”Good Job!” You’re on track to be the best musician you can be.
                </li>
                <li>
                    <span>Additional Enrichment - Online recordings and YouTube.</span> YouTube is a great resource for all musicians. Watch a tutorial or just kick back and watch a great performance. Also, don't forget that listening to a recording of a Band piece is considered practicing!
                </li>
                <li>
                    <span>Live Music -</span> Nothing makes a more lasting impression than watching live music! Examples include:  Oregon Symphony, Jazz Bands, Farmers Markets, Rock Bands, Buskers, etc.
                </li>
            </ol>
            <h1>Practice Books</h1>
            <div className="practice-books">
                <div className="book">
                    <h2>Beginning Band</h2>
                    <a href="https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dmi&field-keywords=MEASURES+OF+SUCCESS+BOOK+1" target="_blank">
                        <img src="http://mttaborband.weebly.com/uploads/2/0/7/8/20780396/475626571_orig.jpg" />
                    </a>
                </div>
                <div className="book">
                    <h2>Intermediate Band</h2>
                    <a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmi&field-keywords=measures+of+success+book+2&rh=n%3A11091801%2Ck%3Ameasures+of+success+book+2" target="_blank">
                        <img src="http://mttaborband.weebly.com/uploads/2/0/7/8/20780396/fjhbb210_orig.jpg" />
                    </a>
                </div>
                <div className="book">
                    <h2>Advanced Band</h2>
                    <a href="https://www.amazon.com/s?k=Habits+of+a+Successful+Middle+School+Musician" target="_blank">
                        <img src="http://mttaborband.weebly.com/uploads/2/0/7/8/20780396/published/habitsimage.png?1537310015" />
                    </a>
                </div>
            </div>
        </main>
    );
}
