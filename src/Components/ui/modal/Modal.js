import React from 'react';
import "./modal.css";

function Modal(props) {
    return (
        <React.Fragment>
        <div className="backdropAlert"></div>
        <div className="custAlert shadow" style={props.style} >
            <div className=" pt-0 p-3 d-flex justify-content-around">
                <h2>{props.title}</h2>
                {props.close? <h1 className="pointer" onClick={props.closeHandler} >X</h1>:null}
            </div>
            <div className="p-2 alertbody ">
                {props.msg || props.children}
            </div>
        </div>
        </React.Fragment>
    )
}



export default Modal

