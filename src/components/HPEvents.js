import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HPEvents(props) {
  const navigate = useNavigate()
  
  return (
    <>
  <div className="d-flex w-100" style={{width: "24rem"}} onClick={()=>{navigate("/all-events/" + props.identity.event_name)}}>
    <img className="align-self-center mr-2" style={{width: "70px", height: "70px", borderRadius: "14px"}} src={props.identity.images_url} alt="Club"/>
    <div className="d-flex flex-column">
      <div className='d-flex'>
      <p className="m-0 mr-2" style={{color: "#980098"}}>{props.identity.date}</p>
      <p className="m-0" style={{color: "gray"}}>{props.identity.day.slice(0,3)} • {props.identity.timings.slice(0,8)}</p>
      </div>
      <p className="m-0">{props.identity.event_name}</p>
      <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{props.identity.event_venue}</p>
    </div>
    <div className='d-flex ml-auto'><i className="bi bi-three-dots-vertical" style={{fontSize: "30px", color: "gray"}}></i></div>
  </div>
  {props.index !== 4 && <hr className="w-100" style={{height: "0.1px"}}/>}
  </>
  )
}
