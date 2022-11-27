import React, { useState, useEffect } from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'


export default function AllEvents() {
  const [recentEvents, setRecentEvents] = useState()
    const  eventData = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    useEffect(() => {
      eventData()
        .then((response) => {
          setRecentEvents(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    
  return (
    <>
    <div className='d-flex justify-content-center mt-5'><h1><strong>All Events</strong></h1></div>
    <div className='col-md-6'>
    {recentEvents?.data.map((fields, index )=> {
      return <RenderEvents key={index} identity={fields}></RenderEvents>
    })}
    </div>
    </>
  )
}
