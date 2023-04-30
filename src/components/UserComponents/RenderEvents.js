import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RenderEvents(props) {
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }    
  const navigate = useNavigate()
  return (
    <>
    <div className='col-lg-6 col-md-6 p-2 w-100 my-1' key={props.fields} onClick={()=>navigate("/all-events/" + props.identity.event_name)}>
        <div className='p-md-2 p-2 w-100 d-flex' style={{borderRadius: "10px", border: "2px solid black", boxShadow: "10px 10px #E8EBEE"}}>
          <img className="col-3 w-100 p-0" style={{borderRadius: "7px", aspectRatio: "1/1"}} alt="" src={props.identity.images_url}/> 
          <div className='overflow-auto col d-flex flex-column pr-0'>
            <div  className='text-truncate overflow-hidden'><b>{props.identity.event_name}</b></div>
            <div className='d-flex overflow-auto align-items-center mt-2 mb-1'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}><i class="fa-regular fa-paper-plane mr-2"></i>{props.identity.event_venue}</div></div>
            <div className='d-flex text-truncate mb-1 mb-lg-0'><div style={{fontSize: "0.7rem", fontWeight: "400"}}><i class="fa-regular fa-calendar mr-2"></i>{props.identity.timings.slice(0,9)} • {formatDate(props.identity.date)}</div><div className='d-flex align-items-center ml-auto mr-lg-3'><div style={{fontSize: "0.7rem", fontWeight: "400"}}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{props.identity.price_range}</div></div></div>
            <div className='btn rounded-pill py-1 mt-md-auto mt-2' style={{background: "black", color: "white", width: "fit-content"}}><p className='mb-0' style={{fontSize: '14px'}}>Book Now</p></div>
          </div>
        </div>
      </div>
    </>
  )
}
