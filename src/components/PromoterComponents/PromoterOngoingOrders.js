import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PromoterSidebar from '../../common/PromoterSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromoterOngoingOrders() {
const navigate = useNavigate()
const [eventData, setEventData] = useState()
const OnGoingEventdata = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/fetch-promoter-events-history?promoter_access_token=${sessionStorage?.token}`)}
    useEffect(() => {
        OnGoingEventdata()
        .then((response) => {
            setEventData(response?.data)
            })
            .catch((error) => {
                console.log(error);
            });
        }, []);

  return (
       <div className='d-md-flex'>
    <div className='col-md-3 p-0'>
        <PromoterSidebar/>
    </div>
    <div className='col-md-9 p-0'>
        <h3 className='my-4 ml-2'>All Events</h3>
        <div className='d-flex flex-wrap'>
        {eventData?.map((identity, fields)=>{
           return(
           <div className='col-md-6 p-2 w-100' key={fields} onClick={()=>navigate(`${identity.event_name}`)}>
            <div className='p-3 w-100 d-flex' style={{border: "1.5px solid black", borderRadius: "10px", boxShadow: "5px 5px rgb(205 207 209)"}}>
                <img style={{width: "100px", height: "100px", borderRadius: "7px"}} alt="" src={identity.images_url}/> 
                <div className='ml-3 overflow-auto'>
                    <h5 className='text-truncate overflow-hidden'>{identity.event_name}</h5>
                    <div className='d-flex overflow-auto'><i className="bi bi-geo mr-2"></i><small className="overflow-hidden text-truncate" style={{fontSize: "13px"}}>{identity.event_venue}</small></div>
                    <div><i className="bi bi-calendar mr-2"></i><small style={{fontSize: "13px"}}>{identity.timings} • {identity.date}</small></div>
                </div>
            </div>
           </div>
           )
        })}
        </div>
    </div>
    </div>
  )
}
