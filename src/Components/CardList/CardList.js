import React, { useState, useEffect } from 'react';
import "./cards.css";

import Card from './Card';


var freeEvents=[];
var paidEvents=[];

function CardList(props) {

    const [cards,setCards] = useState([]);
    const [focusInp, setFocusInp] = useState(false);
    const [srchTxt, setSrchTxt] = useState("");

    useEffect(()=>{
        fetch("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences")
        .then(res=>res.json()
        ).then(res=>{

            freeEvents=res.free.map(event=>({
                entryType:event.entryType,
                imageURL:event.imageURL,
                confName:event.confName,
                date:event.confStartDate,
                confUrl:event.confUrl,
                city:event.city,
                state:event.state,
                country:event.country
            }));

            paidEvents=res.paid.map(event=>({
                entryType:event.entryType,
                imageURL:event.imageURL,
                confName:event.confName,
                date:event.confStartDate,
                confUrl:event.confUrl,
                city:event.city,
                state:event.state,
                country:event.country
            }));

            console.log(freeEvents);
            setCards([...freeEvents,...paidEvents]);

            

        }).catch(err=>{
            console.log(err);
        })
    },[]);

    function srchChangeHandler(e){
        const AllConf=[...freeEvents,...paidEvents];

        if(e.target.value===""){
            setCards(AllConf);
        }else{
            setCards(AllConf.filter(conf=>( 
                conf.confName.toLowerCase().includes(e.target.value.toLowerCase()) || conf.city.toLowerCase().includes(e.target.value.toLowerCase()) 
            )));
        }

        setSrchTxt(e.target.value);
    }

    return (
        <div className="cardCont" >
            <div style={{
                width:"100%"
            }}>
                <div className={focusInp?"srch focus":"srch"}>
                    <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={srchTxt} onChange={srchChangeHandler}   placeholder="Type to Search Conferences" ></input>
                    <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                </div>

            </div>

           {cards.map((card,i)=>(
               <Card data={card} key={i} ></Card>
           ))}
            

        </div>
    )
}



export default CardList

