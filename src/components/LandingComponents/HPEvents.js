import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function   HPEvents(props) {
  const navigate = useNavigate()
  
  return (
    <>
      <div className='col-md-6 p-2 w-100' key={props.fields} onClick={()=>navigate("/all-events/" + props.identity.event_name)}>
        <div className='p-md-3 p-2 w-100 d-flex' style={{border: "1.5px solid black", borderRadius: "10px", boxShadow: "5px 5px rgb(205 207 209)"}}>
          <img className="col-3 w-100 p-0" style={{height: "100px", borderRadius: "7px"}} alt="" src={props.identity.images_url}/> 
          <div className='overflow-auto col'>
            <div className='text-truncate overflow-hidden'  style={{fontWeight: "700", fontSize: "1.375rem"}}>{props.identity.event_name}</div>
            <div className='d-flex overflow-auto align-items-center'><i className="bi bi-geo mr-2"></i><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.event_venue}</div></div>
            <div className='d-flex'><i className="bi bi-calendar mr-2 d-flex"></i><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.timings} • {props.identity.date}</div></div>
            <div className='d-flex align-items-center'><i className="bi bi-tag mr-2"></i><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{props.identity.price_range}</div></div>
          </div>
        </div>
      </div>
  </>
  )
}
