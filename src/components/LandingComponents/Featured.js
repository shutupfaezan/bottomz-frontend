import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// import HPClubs from './HPClubs';
import "../../css/ClubsRow.css"
import HPEvents from './HPEvents';
import { useNavigate } from 'react-router-dom';

export default function ClubsRow() {
    // const [recentClubs, setRecentClubs] = useState()
    const [loading, setLoading] = useState(true)
    const [recentEvents, setRecentEvents] = useState()
    const navigate = useNavigate()
    // const club = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}
    const event = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    
    // useEffect(() => {
    //   club()
    //   .then((response) => {
    //     setLoading(false)
    //     setRecentClubs(response)
    //      })
    //      .catch((error) => {
    //        console.log(error);
    //      });
    //  }, []);


     useEffect(() => {
       event()
         .then((response) => {
          setLoading(false)
           setRecentEvents(response)
         })
         .catch((error) => {
           console.log(error);
         });

     }, []);

    //  const reverseClubs = recentClubs?.data?.reverse()?.slice(0,4)
     const reverseEvents = recentEvents?.data?.slice(0,4)
     
  return (
    <>
      {loading && <div className='d-flex justify-content-center my-auto' style={{height: "50vh"}}>
    <div className='d-flex align-items-center'>
    <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px"}} alt=""/></span>
    </div>
    </div>}
      {!loading && 
      <div className="my-2 px-0 mx-auto MainpageHero">
        <section className='mx-auto py-5'>
          <div className='my-md-4 d-flex align-items-center mb-2 flex-column px-lg-5 px-2 position-relative'>
            <h4 className='mt-2 mx-3 mb-0 headerFontAlt' style={{fontSize: "40px", color: "black"}}>Browse By Upcoming Events</h4>
            <p className='mt-2 mx-3 mb-0' style={{color: "#9D9D9D", fontSize: "14px"}}>Find the event you're looking for from our lineup of bestselling</p>
            <img className="position-absolute" style={{width: "90px", left: "150px"}} src={process.env.PUBLIC_URL + "/images/arrowHeroMain.png"} alt=""></img>
            <img className="position-absolute" style={{width: "90px", right: "150px"}} src={process.env.PUBLIC_URL + "/images/arrowHeroMain2.png"} alt=""></img>
          </div>
          {reverseEvents?.length !== 0 ? <div className='d-flex align-items-center px-lg-5 p-2'>{reverseEvents?.map((fields, index )=> {
            return <HPEvents className="w-100" key={index} index={index} identity={fields}></HPEvents>
          })}
          </div> :
          <div className='d-flex flex-wrap align-items-center mx-lg-5 p-2'>
            <div className='mx-2 w-100 bg-light d-flex flex-column justify-content-center align-items-center text-center' style={{borderRadius: "10px", height: "200px"}}>
              No Live Events Yet! Check back again in some time
            </div>
          </div>}
          <button className=' mt-4 mx-auto d-flex justify-content-center col-md-2 col plannerSectionButton' style={{ borderRadius: "40px", fontWeight: "800", background: "black", color: "white" }} type="submit" onClick={() => navigate("/events")}>Browse All Events</button>
        </section>
        {/* Clubs Section Removed */}
        {/* <section className='pl-lg-5 pr-lg-0 pt-lg-5 pb-lg-4 px-4 py-5 d-flex' style={{background: "#F7F7F7"}} >
          <div className='d-flex py-5' style={{height: "100%"}}>
            <div className='d-flex align-items-baseline mb-2 container-xl p-0 flex-column px-md-4 ml-md-0 ml-3 col-lg-5' style={{height: "100%"}}>
              <h4 className='mt-2 headerFont' style={{fontSize: "60px", textTransform: "uppercase", color: "black"}}>Browse Events By Clubs</h4>
              <p className='mt-2' style={{color: "#9D9D9D", fontSize: "14px"}}>Browse events by clubs that fall near you. We collaborate with the most elite clubs in the city to make sure you experience only the best.</p>
              <button className='col-md-4 col' style={{ borderRadius: "40px", fontWeight: "800", background: "black", color: "white", fontSize: "14px", padding: "12px 10px" }} type="submit" onClick={() => navigate("/contact-us")}>Learn More</button>
            </div>
            <div className='d-flex col p-0 px-md-4 overflow-scroll align-items-center'>
              {reverseClubs?.map((fields, index )=> {
                return <HPClubs key={index} identity={fields}></HPClubs>
              })}
            </div>
          </div>
        </section> */}
        <section className="mb-2 p-lg-5 p-md-4 py-5 px-1" style={{ background: "white" }}>
          <div className='d-flex flex-column d-md-none'>
            <h1 className= "col-md-8 mb-md-4 mb-xl-4 mb-xxl-0 HeaderGlobal pr-5" style={{ fontWeight: "800", color: "black"}}>We Plan Events and you celebrate</h1>
          </div>
          <div className='d-md-flex plannerSectionMainImg' style={{ height: "100%" }}>
            <div className='col-md-6' style={{ height: "100%" }}>
              <img className="w-100 h-100" style={{ objectFit: "cover", borderRadius: "20px" }} src={process.env.PUBLIC_URL + "/images/WPEIMG.png"} alt="Standup Music" />
            </div>
            <div className='d-flex d-md-none'><p className="col-lg-9 col-md-8 my-4" style={{ color: "black" }}>Our primary focus is our customer base, and our priority is making hosting events as easy as possible. This includes over the clock assistance so you can party your heart out without the worry of entries.</p></div>
            <div className='d-flex flex-column col-lg-6 p-0'>
              <div className='d-none d-md-flex flex-column'>
                  <h1 className= "col-md-8 mb-md-4 mb-xl-4 mb-xxl-0 HeaderGlobal 4vw" style={{ fontWeight: "800", color: "black" }}>We Plan Events and you celebrate</h1>
              </div>
              <div className='px-lg-3 p-md-0 px-3' style={{height: "100%"}}>
                <img className="w-100 plannerSectionSubImg" style={{ objectFit: "cover", borderRadius: "20px", height: "100%", overflow: "hidden"}} src={process.env.PUBLIC_URL + "/images/WPEIMG2.png"} alt="Concert" />
              </div>
            </div>
          </div>
          <div className='d-flex mt-md-5 mt-3 mb-md-0 mb-3'>
            <p className="col-lg-9 col-md-8 d-md-flex d-none" style={{ color: "black" }}>Our primary focus is our customer base, and our priority is making hosting events as easy as possible. This includes over the clock assistance so you can party your heart out without the worry of entries.</p>
            <div className='col-lg-3 col-md-4 col-7 d-flex flex-column'>
              <button className='ml-md-auto col-md-8 col plannerSectionButton' style={{ borderRadius: "40px", fontWeight: "800", background: "black", color: "white" }} type="submit" onClick={() => navigate("/contact-us")}>Learn More</button>
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
