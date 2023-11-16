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
          {reverseEvents?.length !== 0 ?<div className='d-flex flex-wrap align-items-center px-lg-5 p-2'>{reverseEvents?.map((fields, index )=> {
            return <HPEvents className="w-100" key={index} index={index} identity={fields}></HPEvents>
          })}
          </div> :
          <div className='d-flex flex-wrap align-items-center mx-lg-5 p-2'>
            <div className='mx-2 w-100 bg-light d-flex flex-column justify-content-center align-items-center text-center' style={{borderRadius: "10px", height: "200px"}}>
              No Live Events Yet! Check back again in some time
            </div>
          </div>}
          <Link to="/events" className='mt-3 d-flex justify-content-center see-all' style={{color: "blueviolet"}}>See All<i className="bi bi-arrow-right ml-2"></i></Link>
        </section>
        <section className='px-lg-5 pt-lg-5 pb-lg-4 px-4 py-5 bg-light'>
          <div className=' d-flex align-items-baseline mb-2 container-xl p-0 flex-column px-md-5 ml-md-0 ml-3'><h4 className='mt-2 primary-header' style={{fontSize: "40px", color: "transparent", WebkitTextStroke: "1px black"}}>Browse Events</h4><h4 className="primary-header mb-3" style={{fontSize: "40px", color: "black"}}> By Clubs</h4></div>
          <div className='d-flex col p-0 flex-wrap px-md-4 mx-md-3'>
            {reverseClubs?.map((fields, index )=> {
              return <HPClubs key={index} identity={fields}></HPClubs>
            })}
          <Link to="/clubs" className='mx-auto my-md-auto mt-lg-3 mb-lg-0 mb-0 mt-3 d-flex see-all' style={{color: "blueviolet"}}>See All <i className="bi bi-arrow-right ml-2"></i></Link>
          </div>
        </section>
        <section className="d-flex mb-2 p-lg-5 flex-wrap plannerSection" style={{ background: "white" }}>
          <div className='col-md-6 plannerSectionMainImg'>
            <img className="w-100 h-100" style={{ objectFit: "cover", borderRadius: "20px" }} src={process.env.PUBLIC_URL + "/images/WPEIMG.png"} alt="Standup Music" />
          </div>
          <div className='col-md-6 plannerSectionMainImg'>
            <div className='col-md-8 d-lg-flex flex-column d-lg-none'>
              <h1 className="mb-md-4 mb-xl-4 mb-xxl-0 HeaderGlobal" style={{ fontWeight: "800", color: "black", fontSize: "4vw" }}>We Plan Events and you celebrate</h1>
            </div>
            <div className='col'>
              <img className="w-100 h-100" src={process.env.PUBLIC_URL + "/images/WPEIMG2.png"} alt="Concert" />
            </div>
          </div>
          <div className='d-flex mt-5'>
            <p className="col-md-9" style={{ color: "black" }}>
              Our primary focus is our customer base, and our priority is making hosting events as easy as possible. This includes over the clock assistance so you can party your heart out without the worry of entries.
            </p>
            <div className='col-md-3 col-6 d-flex flex-column'>
              <button className='ml-auto col-md-8 col-6' style={{ borderRadius: "40px", fontWeight: "800", padding: "12px 10px", background: "black", color: "white" }} type="submit" onClick={() => navigate("/contact-us")}>Learn More</button>
            </div>
          </div>
        </section>
        <section className="d-flex flex-md-row flex-column-reverse justify-content-between mx-2 p-md-0 p-4 position-relative" style={{background: "black", borderRadius: "20px"}}>
          <img className="position-absolute d-md-block d-none" style={{top: "40px", zIndex: "10"}} src={process.env.PUBLIC_URL + "/images/MTTLines1.png"} alt=""></img>
          <img className="position-absolute d-md-block d-none" style={{bottom: "0px", left: "200px", zIndex: "10"}} src={process.env.PUBLIC_URL + "/images/MTTLines2.png"} alt=""></img>
          <div className='col-lg-5 col-md-6 p-lg-5 p-md-4 p-0 my-auto'>
            <div className='d-flex flex-column'>
              <h1 className="mb-md-3 my-md-3 HeaderGlobal my-4" style={{fontWeight: "800", color: "white"}}>More Than Ticketing</h1>
              <p className="mb-4" style={{color: "#989898"}}>For the world’s best venues, promoters and festivals, a partnership with Bottmzup is so much more than just ticketing.</p>
              <button className='col-md-5 col-6' style={{borderRadius: "40px", fontWeight: "800", padding: "12px 10px", background: "white", color: "black"}}  type="submit" onClick={()=>navigate("/contact-us")}>Contact Us</button>
            </div>
          </div>
          <div className='col-lg-5 col-md-6 p-0'>
            <div style={{height: "100%"}}>
              <img className="w-100" style={{borderRadius: "10px", height:"100%", objectFit: "cover"}}  src={process.env.PUBLIC_URL + "/images/MTTHero.png"} alt=""></img>
            </div>
          </div>
        </section>
      </div>
      }
    </>
  )
}
