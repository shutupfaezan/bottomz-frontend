import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Footer from "../../common/Footer"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import GlobalHeader from '../../common/GlobalHeader';
import "../../css/SingularEvent.css"
import  Breadcrumb  from '../../extra/Breadcrumb';
import GenericTC from '../../common/GenericTC';

export default function SingularEvents() {
    const params = useParams()
    const location = useLocation();
    const [eventData, setEventData] = useState()
    const [priceData, setPriceData] = useState()
    const navigate = useNavigate()
    const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params?.event_name}`)}
    useEffect(() => {
      event()
      .then((response) => {
        console.log(response?.data)
        setEventData(response?.data?.event_data)
        setPriceData(response?.data?.ticket_categories)
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
    }, []);

    const formatDate = (dateStr) => {
      if (!dateStr) {
        return "No date available";
      }
      const [year, month, day] = dateStr.split("-");
      const date = new Date(year, month - 1, day);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      // const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      return `${formattedDate}`;
    };
    
    const findLowestPrice = () => {
      if (!priceData || priceData.length === 0) {
        return "No Preview";
      }

      let lowestPrice = priceData[0].price;

      priceData.forEach((ticketCategory) => {
        if (ticketCategory.price < lowestPrice) {
          lowestPrice = ticketCategory.price;
        }
      });
  
      return lowestPrice;
    };
    useEffect(() => {
      const handleScroll = () => {
        const button = document.querySelector('.bookingSpotButton');
        const eventContainer = document.querySelector('.eventContainer');
    
        if (button && eventContainer) {
          const scrollY = window.scrollY;
          const eventContainerHeight = eventContainer.clientHeight;
    
          // Adjust this threshold as needed
          const scrollThreshold = eventContainerHeight * 0.65;
    
          if (scrollY > scrollThreshold) {
            button.classList.add('hidden'); // Add the hidden class
          } else {
            button.classList.remove('hidden'); // Remove the hidden class
          }
        }
      };
    
      // Attach the scroll event listener
      window.addEventListener('scroll', handleScroll);
    
      // Clean up the listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const redirectToCheckout = () => {
      const queryParams = new URLSearchParams(location.search);
      const subpromoter = queryParams.get('subpromoter');
  
      navigate(`/events/${params?.event_name}/checkout?${subpromoter ? `?sub_promoter=${subpromoter}` : ''}`);
    };
    
    
    
    return (
      <>
        <div className="p-md-2">
          <GlobalHeader/>
          <div className="globalEventContainer" style={{background: "rgba(15, 15, 15, 1)", borderRadius: "20px", height: "850px", marginBottom: "100px"}}>
            <div className="position-absolute d-md-block d-none" style={{top: "130px"}}>
              <Breadcrumb/>
            </div>
            <div className='d-flex flex-column-reverse flex-md-row position-absolute eventContainer px-md-5' style={{top: "200px", height: "100%", overflow: "hidden"}}>
              <div className='col-lg-7 col-md-7 px-4 pr-md-0 pl-md-3 mb-5 mb-md-0' style={{height: "100%", overflow: "scroll", scrollBehavior: "smooth"}}>
                <h1 className='mb-4' style={{fontSize: "60px", fontWeight: "800", color: "rgba(255, 255, 255, 1)", textTransform: "uppercase"}}>{eventData?.event_name}</h1>
                <div className='mt-5'>
                  <span className='d-flex align-items-baseline mb-2'><i class="fa-solid fa-clock mr-2" style={{fontSize: "20px", color: "white"}}></i><h5 style={{fontWeight: "700", color: "rgba(255, 255, 255, 1)", textTransform: "uppercase"}}>Schedule</h5></span>
                  <span className='d-flex align-items-baseline pl-4'><p style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "18px"}}>{formatDate(eventData?.date)} at {eventData?.timings}</p></span>
                  </div>
                <div className='mt-3 mb-5'>
                  <span className='d-flex align-items-baseline mb-2'><i class="fa-solid fa-location-dot mr-2" style={{fontSize: "20px", color: "white"}}></i><h5 style={{fontWeight: "700", color: "rgba(255, 255, 255, 1)", textTransform: "uppercase"}}>Location</h5></span>
                  <span className='d-flex align-items-baseline pl-4'><p style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "18px"}}><a style={{color: "rgba(255, 255, 255, 0.7)"}} href={"/clubs/"+eventData?.event_venue?.split(',')[0]}>{eventData?.event_venue?.split(',')[0]}</a>, {eventData?.event_venue?.split(',').slice(1).join(', ')}</p></span>
                </div>
                <div className='d-flex col-lg-11 px-4 bookingSpotButton py-md-1 py-2' style={{border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", background: "rgba(255, 255, 255, 0.1)" }}>
                  <div className='mt-3'>
                    <p className="mb-0 bookingSpotButtonText" style={{fontWeight: "400", color: "rgba(255, 255, 255, 1)", fontSize: "16px"}}>Prices start from</p>
                    <p className="mb-1" style={{fontWeight: "700", color: "rgba(255, 255, 255, 1)", fontSize: "25px"}}>{findLowestPrice() === "0" ? "Free" : findLowestPrice()}</p>
                    <p className="d-none d-lg-block" style={{fontWeight: "400", color: "rgba(255, 255, 255, 1)", fontSize: "12px"}}><span style={{color: "#FF334A"}}>*</span>Price may vary depending on the type of purchase</p>
                  </div>
                  <button className='btn btn-primary my-auto ml-auto rounded-pill' style={{height: "fit-content", width: "fit-content", color: "black", background: "white", fontSize: "16px", fontWeight: "700", padding: "15px 25px"}} onClick={()=>{redirectToCheckout()}}>Book Your Spot</button>
                </div>
                <div className='mt-5 col-lg-11 p-0 px-md-3'>
                  <h5 className="mb-4" style={{fontSize: "25px", fontWeight: "700", color: "white"}}>ABOUT EVENT</h5>
                  <p style={{fontSize: "16px", fontWeight: "400", color: "rgba(255, 255, 255, 0.65)"}}>{eventData?.description}</p>
                </div>
                <div className='mt-5 col-lg-11 p-0 px-md-3'>
                  <h5 className="mb-4" style={{fontSize: "25px", fontWeight: "700", color: "white"}}>INSTRUCTIONS</h5>
                  {eventData?.terms?.slice(2, eventData?.terms?.length - 2).split(`","`)?.[0] !== "" ?  <ol style={{lineHeight: "25px", padding: "0px 20px"}}>{eventData?.terms?.slice(2, eventData?.terms?.length - 2).split(`","`)?.map((fields, index )=> {
                      return <li style={{fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", fontWeight: 400}} key={index}>{fields}</li>
                    })}</ol> : <GenericTC/> 
                  }
                </div>
              </div>
              <div className='col-lg-5 col-md-5 px-4 pt-5 mt-5 pt-md-0 mt-md-0 '>
                {/* removes object fit contain from here img style */}
                <img className="my-5 my-md-0 event-img" style={{width: "100%", borderRadius: "20px" }} src={eventData?.images_url} alt="Event Poster"></img>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </>
  )
}
