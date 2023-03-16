import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import HPClubs from './HPClubs';
import "../../css/ClubsRow.css"
import HPEvents from './HPEvents';
import { Link } from 'react-router-dom';

export default function ClubsRow() {
    const [recentClubs, setRecentClubs] = useState()
    const [loading, setLoading] = useState(true)
    const [recentEvents, setRecentEvents] = useState()
    const make = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}
    const event = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    
    useEffect(() => {
      make()
      .then((response) => {
        setLoading(false)
        setRecentClubs(response)
         })
         .catch((error) => {
           console.log(error);
         });
     }, []);


     useEffect(() => {
       event()
         .then((response) => {
           setRecentEvents(response)
         })
         .catch((error) => {
           console.log(error);
         });

     }, []);

     const reverseClubs = recentClubs?.data.reverse().slice(0,4)
     const reverseEvents = recentEvents?.data.slice(0,6)

  return (
    <>
      {loading && <div className='d-flex justify-content-center mt-auto'>
      <div className='d-flex align-items-center'>
      <span style={{fontSize: "35px"}}>Loading </span>
      <div className="my-auto spinner-border text-black " role="status">
      </div>
      </div>
      </div>}
      {!loading && 
      <div className="my-2 px-0">
        <section className='px-md-5 py-3'>
          <div className='mt-md-4 d-flex align-items-baseline mb-2 flex-column px-lg-5 px-2'>
            <h4 className='mt-2 mx-3 primary-header mb-0' style={{fontSize: "40px", color: "transparent", WebkitTextStroke: "1px black"}}>Browse By</h4>
            <h4 className="primary-header mb-3 mt-2 mx-3" style={{fontSize: "40px"}}>Upcoming Events</h4></div>
          <div className='d-flex flex-wrap align-items-center px-lg-5 p-2'>{reverseEvents?.map((fields, index )=> {
            return <HPEvents className="w-100" key={index} index={index} identity={fields}></HPEvents>
          })}
          </div>
          <Link to="/all-events" className='mt-3 d-flex justify-content-center' style={{color: "blueviolet"}}>See All<i class="bi bi-arrow-right ml-2"></i></Link>
        </section>
        <section className='px-lg-5 pt-lg-5 pb-lg-4 px-4 py-5 bg-light'>
          <div className=' d-flex align-items-baseline mb-2 container-xl p-0 flex-column px-md-5 ml-md-0 ml-3'><h4 className='mt-2 primary-header' style={{fontSize: "40px", color: "transparent", WebkitTextStroke: "1px black"}}>Browse Events</h4><h4 className="primary-header mb-3" style={{fontSize: "40px", color: "black"}}> By Clubs</h4></div>
          <div className='d-flex col p-0 flex-wrap px-md-4 mx-md-3'>
            {reverseClubs?.map((fields, index )=> {
              return <HPClubs key={index} identity={fields}></HPClubs>
            })}
          <Link to="/all-clubs" className='mx-auto my-md-auto mt-lg-3 mb-lg-0 mb-0 mt-3 d-flex ' style={{color: "blueviolet"}}>See All <i class="bi bi-arrow-right ml-2"></i></Link>
          </div>
        </section>
      </div>
      }
    </>
  )
}
