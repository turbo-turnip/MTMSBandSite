import React from 'react';

export default function Instrument(props) {
    return (
        <section className="instrument-content">
            {
                props.data.type === "Brass" &&
                <React.Fragment>
                    <h1>Fingering Charts</h1>
                    <div className="charts">
                        {props.data.charts.map(chart => 
                            <div className="chart">
                                <h4>{chart.name}</h4>
                                <a href={chart.location} download>{chart.name.toLowerCase()}</a>
                                <div class="img">
                                    <img src="https://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/arrow-download-icon.png" alt="download" />
                                </div>
                            </div>)}
                    </div>
                </React.Fragment>
            }
            <h1>Private Teachers</h1>
            {
                props.data['private_teachers'].map(teacher => 
                    <div className="teacher">
                        {teacher.name && <p>{teacher.name} ({teacher.instruments.join(', ')})</p>}
                        {teacher['phone_number'] && <p>{teacher['phone_number']}</p>}
                        {teacher.email && <a href={`mailto:${teacher.email}`}>{teacher.email}</a>}
                    </div>)
            }
            {/* <div className="teacher">
                <p>Erick E. Escobar (Trumpet)</p>
                <p>(970) 818-1906</p>
                <a href="mailto:erick.e.escobar@hotmail.com">erick.e.escobar@hotmail.com</a>
            </div>
            <div className="teacher">
                <p>Ben Medler (Trumpet, Trombone, Bass)</p>
                <a href="mailto:ben@medlerstudios.com">ben@medlerstudios.com</a>
            </div> */}
        </section>
    );
}