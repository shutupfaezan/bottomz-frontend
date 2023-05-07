import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import HPClubs from './HPClubs';
import "../../css/ClubsRow.css"
import HPEvents from './HPEvents';
import { Link, useNavigate } from 'react-router-dom';

export default function ClubsRow() {
    const [recentClubs, setRecentClubs] = useState()
    const [loading, setLoading] = useState(true)
    const [recentEvents, setRecentEvents] = useState()
    const navigate = useNavigate()
    const club = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}
    const event = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    
    useEffect(() => {
      club()
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

     const reverseClubs = recentClubs?.data?.reverse()?.slice(0,4)
     const reverseEvents = recentEvents?.data?.slice(0,4  )

  return (
    <>
      {loading && <div className='d-flex justify-content-center my-auto' style={{height: "50vh"}}>
    <div className='d-flex align-items-center'>
    <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px"}} alt=""/></span>
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
          <Link to="/events" className='mt-3 d-flex justify-content-center' style={{color: "blueviolet"}}>See All<i className="bi bi-arrow-right ml-2"></i></Link>
        </section>
        <section className='px-lg-5 pt-lg-5 pb-lg-4 px-4 py-5 bg-light'>
          <div className=' d-flex align-items-baseline mb-2 container-xl p-0 flex-column px-md-5 ml-md-0 ml-3'><h4 className='mt-2 primary-header' style={{fontSize: "40px", color: "transparent", WebkitTextStroke: "1px black"}}>Browse Events</h4><h4 className="primary-header mb-3" style={{fontSize: "40px", color: "black"}}> By Clubs</h4></div>
          <div className='d-flex col p-0 flex-wrap px-md-4 mx-md-3'>
            {reverseClubs?.map((fields, index )=> {
              return <HPClubs key={index} identity={fields}></HPClubs>
            })}
          <Link to="/clubs" className='mx-auto my-md-auto mt-lg-3 mb-lg-0 mb-0 mt-3 d-flex ' style={{color: "blueviolet"}}>See All <i className="bi bi-arrow-right ml-2"></i></Link>
          </div>
        </section>
        <section className="d-flex flex-md-row flex-column-reverse p-md-5 py-5 px-4 ticketingSection" style={{background: "black"}}>
            <div className='col-lg-5 col-md-6 p-lg-5 d-flex flex-column p-0 px-md-3'>
              <div style={{height: "100%"}} className='d-flex flex-column'>
              <h1 className="mb-md-3 my-3" style={{fontWeight: "800", fontSize: "40px", color: "white"}}>More Than Ticketing</h1>
              <b style={{color: "white"}}>For the world’s best venues, promoters and festivals, a partnership with Bottmzup is so much more than just ticketing.</b>
              <p style={{background: "crimson", width: "fit-content"}} className='btn mt-lg-auto mt-xl-5 text-white rounded-pill px-3 py-xxl-3 mb-md-0 mt-5' onClick={()=> navigate("/contact-us")}>Contact Us</p>
              </div>
            </div>
            <div className='col-lg-7 col-md-6 p-lg-5 p-0'>
              <div className='w-100' style={{height: "100%"}}>
              <img className="w-100" style={{borderRadius: "10px", height:"100%", objectFit: "cover"}} src='https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt=""></img>
              </div>
            </div>
        </section>
      </div>
      }
    </>
  )
}
