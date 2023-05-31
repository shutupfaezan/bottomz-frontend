import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SingularContext } from '../../contexts/Context';
import {useContext} from 'react'

export default function   HPEvents(props) {
  const {setInputValues, setInputModal} = useContext(SingularContext);
  const navigate = useNavigate()
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-")
    const date = new Date(year, month - 1, day)
    const options = {month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }
  
  return (
    <>
      <div className='col-lg-6 col-md-6 p-2 w-100 my-1' key={props.fields} onClick={()=>{navigate("/events/" + props.identity.event_name); setInputValues([]); setInputModal(false)}}>
        <div className='p-md-2 p-2 w-100 d-flex cursor-pointer' style={{borderRadius: "10px", border: "2px solid black", boxShadow: "10px 10px #E8EBEE"}}>
          <div className='col-3 w-100 p-0 d-flex'>
          <img className="w-100 p-0 FeaturedEventsCtrl" style={{borderRadius: "7px"}} alt="" src={props.identity.images_url}/>
          </div>
          <div className='overflow-auto col d-flex flex-column pr-0'>
            <div  className='text-truncate overflow-hidden'><b>{props.identity.event_name}</b></div>
            <div className='d-flex overflow-auto align-items-center mt-2 mb-1'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}><i className="fa-regular fa-paper-plane mr-2"></i>{props.identity.event_venue}</div></div>
            <div className='d-flex text-truncate mb-1 mb-lg-0'><div style={{fontSize: "0.7rem", fontWeight: "400"}}><i className="fa-regular fa-calendar mr-2"></i>{props.identity.timings.slice(0,9)} • {formatDate(props.identity.date)}</div><div className='d-flex align-items-center ml-auto mr-lg-3'><div style={{fontSize: "0.7rem", fontWeight: "400"}}><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{props.identity.price_range}</div></div></div>
            <div className='btn rounded-pill py-1 mt-lg-auto mt-auto btn-hp-events' style={{background: "black", color: "white", width: "fit-content"}}><p className='mb-0' style={{fontSize: '14px'}}>Book Now</p></div>
          </div>
        </div>
      </div>
  </>
  )
}
