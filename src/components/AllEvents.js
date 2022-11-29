import React, { useState, useEffect } from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'
import "../css/AllEvents.css"
import Header from "../common/Header"


export default function AllEvents() {
  const [recentEvents, setRecentEvents] = useState()
  const [loading, setLoading] = useState(true)
    const  eventData = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    useEffect(() => {
      eventData()
        .then((response) => {
          setLoading(false)
          setRecentEvents(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    
  return (
    <>
    <Header/>
    {/* <div className='d-flex justify-content-center mt-5'><h1><strong>Events</strong></h1></div> */}
    <div className='d-flex justify-content-center mt-auto'>
    {loading && <div class="my-auto spinner-border text-info " role="status">
    <span class="sr-only">Loading...</span>
    </div>}
    </div>
    {!loading && <div className='d-flex'>
    <div className='col-lg-4'>
    <form class="d-flex" role="search">
        <input class="form-control" type="search" style={{borderRadius: "20px", border: "1px solid black"}} placeholder="Search Your Mind..." aria-label="Search"/>
        <i class="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "5px" }}></i>   
      </form> 
    {recentEvents?.data.map((fields, index )=> {
      return <RenderEvents key={index} identity={fields}></RenderEvents>
    })}
    </div>
      </div>}
    </>
  )
}
