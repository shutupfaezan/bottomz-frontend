import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function SingularEvents() {
    const [singleEvent, setSingleEvent] = useState()
    const params = useParams()
    const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params.event_name}`)}

    useEffect(() => {
        event()
        .then((response) => {
          console.log(response.data)
          setSingleEvent(response?.data)
        })
        .catch((error) => {
            console.log(error);
        });
        //eslint-disable-next-line
    }, []);

    return (
    <div>
      <div className='w-100 p-4 d-md-flex' style={{background: "#361532"}}>
        <div style={{maxWidth: "100%"}}>
        <img style={{height:"auto", maxHeight: "250px", maxWidth: "100%"}} src={singleEvent?.images_url} alt=""/>
        </div>
        <div className='mt-lg-0 mt-md-0 mt-4 w-100'>
          <h1 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_name}</h1>
          <h4 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_venue}</h4>
            <p className="ml-md-4 d-inline-flex p-1 bg-white mt-2 px-3" style={{color: "#1c1d1f", border: "1px solid white", borderRadius: "10px"}}>{singleEvent?.genre}</p>
          <h4 className="ml-md-4" style={{color: "white"}}>Curated by : {singleEvent?.curated_by}</h4>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}
