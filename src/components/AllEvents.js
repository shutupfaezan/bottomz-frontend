import React, { useState, useEffect } from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'
import TCStatic from './TCStatic'


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
    <div className='d-flex justify-content-center mt-5'><h1><strong>Events</strong></h1></div>
    <div className='d-flex justify-content-center  mt-auto'>
    {loading && <div class="my-auto spinner-border text-info " role="status">
    <span class="sr-only">Loading...</span>
    </div>}
    </div>
    {!loading && <div className='d-flex'>
    <div className='col-lg-8 '>
    {recentEvents?.data.map((fields, index )=> {
      return <RenderEvents key={index} identity={fields}></RenderEvents>
    })}
    </div>
      <TCStatic className='col-lg-4'/>
      </div>}
    </>
  )
}
