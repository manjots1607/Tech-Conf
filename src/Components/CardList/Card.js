import React from 'react';
import markImg from "./location.svg";

function Card(props) {
    return (
        <div className="card">
            <div className="cover" style={{backgroundImage:`url(${props.data.imageURL?props.data.imageURL[0]!==`"`?`"${props.data.imageURL}"`:props.data.imageURL:"./coverConf.jpg"})`}} ></div>
            <div className="body" >
                <h2> {props.data.confName || "React Dev Days" } </h2>
                <div className="d-flex justify-between mb-4" >
                    <div className="date" > {props.data.date || "22, Jan, 2020"} </div>
                    
                    <div className="free" > Free </div>
                </div>
                <div className="d-flex align-center mb-4">
                    <img src={markImg} alt="Marker" style={{width:"22px"}} />
                    <span className="date"> {props.data.city? (props.data.city+", "):""} {props.data.state? (props.data.state+", "):""} {props.data.country? (props.data.country):""}  </span>
                </div>

                <div className="footer">
                    <a className="btn" href={props.data.confUrl} target="_blank"  rel="noopener noreferrer" > View Details </a>
                </div>
            </div>
        </div>
    )
}


export default Card

