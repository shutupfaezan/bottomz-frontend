import axios from 'axios'
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import HPClubs from './HPClubs';
import "../css/ClubsRow.css"
import HPEvents from './HPEvents';

export default function ClubsRow() {
    const [recentClubs, setRecentClubs] = useState()
    const [recentEvents, setRecentEvents] = useState()
    const make = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/fetch-popular-clubs")}
    const event = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/fetch-popular-events")}
 
     // console.log(recentClubs?.data)
     useEffect(() => {
       make()
         .then((response) => {
           console.log(response)
           setRecentClubs(response)
         })
         .catch((error) => {
           console.log(error);
         });
     }, []);


     useEffect(() => {
       event()
         .then((response) => {
           console.log(response)
           setRecentEvents(response)
         })
         .catch((error) => {
           console.log(error);
         });

     }, []);


  return (
    <>
    <div className="d-lg-flex">
      <div className='col-lg-8'>
    <div className='mx-md-4 mt-4 d-flex align-items-baseline'><h4 className='mt-2 mb-0 mx-2'><strong>Featured Clubs🔥</strong></h4><Link className='ml-auto d-block text-decoration-none d-md-none' to="/all-clubs" style={{color: "#9E0A0A"}}>View All Clubs</Link></div>
    <div className='d-flex flex-md-wrap overflow-auto  '>
        {recentClubs?.data.map((fields, index )=> {
      return <HPClubs className="col" key={index} identity={fields}></HPClubs>
    })} 
    </div>
    </div>
    <div className='col-lg-4'>
    <div className='mr-4 mt-md-4 d-flex align-items-baseline'><h4 className='mt-2 mb-0 mx-2'><strong>Ongoing Events🔥</strong></h4><Link className='ml-auto d-block text-decoration-none d-md-none' to="/all-clubs" style={{color: "#9E0A0A"}}>View Events</Link></div>
    <div className='d-flex d-md-block flex-column align-items-center'>{recentEvents?.data.map((fields, index )=> {
      return <HPEvents className="col shadow-lg" key={index} identity={fields}></HPEvents>
    })} </div>
    </div>
    </div>
    </>
  )
}
