import React, { useState, useEffect } from 'react';
import "./cards.css";

import Card from './Card';
import Modal from '../ui/modal/Modal';


var freeEvents=[];
var paidEvents=[];
var filteredEvents=[];

var countryArr = [];
var cityArr = [];

function CardList(props) {

    const [cards,setCards] = useState([]);
    const [focusInp, setFocusInp] = useState(false);
    const [srchTxt, setSrchTxt] = useState("");
    const [sort, setSort] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filter,setFilters] = useState(
    {
        city:{
            enabled:false,
            value:""
        },
        country:{
            enabled:false,
            value:""
        },
        entryType:{
            enabled:false,
            value:""
        }
    })

    useEffect(()=>{
        fetch("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences")
        .then(res=>res.json()
        ).then(res=>{

            
            var countrySet = new Set();
            var citySet = new Set();

            freeEvents=res.free.map(event=>{
                if(event.country.trim()){
                    countrySet.add(event.country.trim());
                }
                if(event.city.trim()){
                    citySet.add(event.city.trim());
                }
                return {
                entryType:event.entryType,
                imageURL:event.imageURL,
                confName:event.confName,
                date:event.confStartDate,
                confUrl:event.confUrl,
                city:event.city,
                state:event.state,
                country:event.country
            }});

            paidEvents=res.paid.map(event=>{
                if(event.country.trim()){
                    countrySet.add(event.country.trim());
                }
                if(event.city.trim()){
                    citySet.add(event.city.trim());
                }
                return {
                entryType:event.entryType,
                imageURL:event.imageURL,
                confName:event.confName,
                date:event.confStartDate,
                confUrl:event.confUrl,
                city:event.city,
                state:event.state,
                country:event.country
            }});

            console.log(freeEvents);
            countryArr=Array.from(countrySet);
            cityArr=Array.from(citySet);
            console.log(countryArr);
            setCards([...freeEvents,...paidEvents]);
            filteredEvents=[...freeEvents,...paidEvents];

            setFilters({
                city:{
                    enabled:false,
                    value:cityArr[0]
                },
                country:{
                    enabled:false,
                    value:countryArr[0]
                },
                entryType:{
                    enabled:false,
                    value:"Free"
                }
            })

            

        }).catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(function(){
        var AllConf=[...freeEvents,...paidEvents];

        if(filter.entryType.enabled){
            AllConf=filter.entryType.value==="Free"?freeEvents:paidEvents;
        }

        if(filter.city.enabled){
            AllConf= AllConf.filter(conf=>conf.city.trim()===filter.city.value);
        }

        if(filter.country.enabled){
            AllConf=AllConf.filter(conf=>conf.country.trim()===filter.country.value);
        }

        filteredEvents=AllConf;
        setCards(filteredEvents);



    },[filter])

    function srchChangeHandler(e){
        const AllConf=filteredEvents;

        if(e.target.value===""){
            setCards(AllConf);
        }else{
            setCards(AllConf.filter(conf=>( 
                conf.confName.toLowerCase().includes(e.target.value.toLowerCase()) || conf.city.toLowerCase().includes(e.target.value.toLowerCase()) 
            )));
        }

        setSrchTxt(e.target.value);
    }

    function sortHandler(e){
        if(e.target.value === "date" ){
            const Conf=[...cards];
            Conf.sort((a,b)=>{
             if(new Date(a.date)> new Date(b.date)){
                 return 1;
             }else if(new Date(a.date)< new Date(b.date)){
                 return -1;
             }else{
                 return 0;
             }
            });
            setCards(Conf);
        }else{
            const AllConf=[...freeEvents,...paidEvents];
            setCards(AllConf);
        }

        setSort(e.target.value);

    }

    function closeHandler(){
        
        setShowFilterModal(false);
    }

    return (
        <React.Fragment>
        <div className="cardCont" >
            
            <div style={{
                width:"100%"
            }}>
                <div className={focusInp?"srch focus":"srch"}>
                    <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={srchTxt} onChange={srchChangeHandler}   placeholder="Type to Search Conferences" ></input>
                    <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                </div>
                <div className="optionsDiv d-flex justify-right" >
                    <button className="btn mr-3" onClick={()=>setShowFilterModal(true)} > Filter </button>
                    <select value={sort} onChange={sortHandler} >
                        <option value=""> Sort By </option>
                        <option value="date"> Date </option>
                    </select>
                </div>

            </div>

           {cards.map((card,i)=>(
               <Card data={card} key={i} ></Card>
           ))}
            

        </div>

        {showFilterModal? 
        <Modal title="Filters"  close={true} closeHandler={closeHandler} >
            <div >
                <div className="d-flex align-center mb-3">
                    <div style={{width:"160px"}}>
                        <input type="checkbox" checked={filter.city.enabled} onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.city.enabled=e.target.checked; setFilters(newFilter); }} ></input> &nbsp;
                        <span> Filter By City </span>
                        
                    </div>
                    <select disabled={!filter.city.enabled} value={filter.city.value} onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.city.value=e.target.value; setFilters(newFilter); }} className="filterSelect" >
                        {cityArr.map((city,i)=>(
                            <option value={city} key={i} > {city} </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex align-center mb-3">
                    <div style={{width:"160px"}} >
                        <input type="checkbox" checked={filter.country.enabled} onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.country.enabled=e.target.checked; setFilters(newFilter); }} ></input> &nbsp;
                        <span> Filter By Country </span>
                        
                    </div>
                    <select disabled={!filter.country.enabled} className="filterSelect" value={filter.country.value}  onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.country.value=e.target.value; setFilters(newFilter); }} >
                        {countryArr.map((country,i)=>(
                            <option value={country} key={i} > {country} </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex align-center mb-3">
                    <div >
                        <input type="checkbox" checked={filter.entryType.enabled} onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.entryType.enabled=e.target.checked; setFilters(newFilter); }}  ></input> &nbsp;
                        <span> Filter By EntryType </span>
                        
                    </div>
                    <select disabled={!filter.entryType.enabled} className="filterSelect" value={filter.entryType.value} onChange={(e)=>{const newFilter=JSON.parse(JSON.stringify(filter)); newFilter.entryType.value=e.target.value; setFilters(newFilter); }} >
                        <option value="Free" > Free </option>
                        <option value="Paid" > Paid </option>
                        
                    </select>
                </div>
                <div style={{textAlign:"center"}} >
                    <button className="btn" onClick={()=>setShowFilterModal(false)} > OK </button>
                </div>
            </div>
        </Modal>
        :null}
        </React.Fragment>
    )
}



export default CardList

