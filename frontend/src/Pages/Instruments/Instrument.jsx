import React from 'react';

export default function Instrument(props) {
    return (
        <section className="instrument-content">
            {
                props.data.diagram &&
                    <React.Fragment>
                        <h1>{props.data.diagram.name} Diagram</h1>
                        <div class="diagram-container">
                            <div class="diagram">
                                <img alt="" className="img" src={props.data.diagram.image} />
                            </div>
                        </div>
                    </React.Fragment>
            }
            {
                (props.data.type !== "Percussion") &&
                    <React.Fragment>
                        <h1>Fingering Charts</h1>
                        <div className="charts">
                            {props.data.charts.map(chart => 
                                <div className="chart" key={chart.name}>
                                    <h4>{chart.name}</h4>
                                    <a href={chart.location} download>{chart.name.toLowerCase()}</a>
                                    <div className="img">
                                        <img src="https://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/arrow-download-icon.png" alt="download" />
                                    </div>
                                </div>)}
                        </div>
                    </React.Fragment>
            }
            {   
                props.data.type !== "Bass" && 
                    <React.Fragment>
                        <h1>Private Teachers</h1>
                        {
                            props.data['private_teachers'].map(teacher =>
                                <div className="teacher" key={teacher.name}>
                                    {teacher.name && <p>{teacher.name} ({teacher.instruments.join(', ')})</p>}
                                    {teacher['phone_number'] && <p>{teacher['phone_number']}</p>}
                                    {teacher.email && <a href={`mailto:${teacher.email}`}>{teacher.email}</a>}
                                    {teacher.website && <a href={teacher.website} target="_blank" rel="noreferrer">{teacher.website}</a>}
                                </div>)
                        }
                    </React.Fragment>
            }
            {
                props.data.reeds && 
                    <React.Fragment>
                        <h1 className="reeds">Reeds</h1>
                        {props.data.reeds.map(reed => 
                            <div className="reed" key={reed.link}>
                                <h4>{reed.for} — Strength {reed.strength}</h4>
                                <a href={reed.link} target="_blank" rel="noreferrer">Purchase (amazon.com)</a>
                            </div>)}
                    </React.Fragment>
            }
        </section>
    );
}