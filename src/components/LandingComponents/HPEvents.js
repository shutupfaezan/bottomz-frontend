import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function   HPEvents(props) {
  const navigate = useNavigate()
  
  return (
    <>
      <div className='col-lg-4 col-md-6 p-2 w-100 my-1' key={props.fields} onClick={()=>navigate("/all-events/" + props.identity.event_name)}>
        <div className='p-md-3 p-3 w-100 d-flex shadow' style={{borderRadius: "10px"}}>
          <img className="col-3 w-100 p-0" style={{height: "80px", borderRadius: "7px"}} alt="" src={props.identity.images_url}/> 
          <div className='overflow-auto col'>
            <div  className='text-truncate overflow-hidden'><b>{props.identity.event_name}</b></div>
            <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.event_venue}</div></div>
            <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.timings} • {props.identity.date}</div></div>
            <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.price_range}</div></div>
          </div>
        </div>
      </div>
  </>
  )
}
