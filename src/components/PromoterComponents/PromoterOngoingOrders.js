import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PromoterSidebar from '../../common/PromoterSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromoterOngoingOrders() {
const navigate = useNavigate()
const [eventData, setEventData] = useState()
const [isLoading, setIsLoading] = useState(true)
const OnGoingEventdata = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/fetch-promoter-events-history?promoter_access_token=${sessionStorage?.token}`)}
    useEffect(() => {
        OnGoingEventdata()
        .then((response) => {
            setEventData(response?.data)
            setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
        }, []);

  return (
       <div className='d-md-flex vh-100'>
    <div className='col-md-3 p-0'>
        <PromoterSidebar/>
    </div>
    <div className='col-md-9 p-0'>
        <h3 className='my-4 ml-2'>All Events</h3>
        {isLoading && <div className='d-flex justify-content-center mt-auto'>
    <div className='d-flex align-items-center'>
    <span style={{fontSize: "35px"}}>Loading </span>
    <div className="my-auto spinner-border text-black " role="status">
    </div>
    </div>
    </div>}
        {!  isLoading && <div className='d-flex flex-wrap'>
        {eventData?.map((identity, fields)=>{
           return(
            <>
           <div className='col-md-6 p-2 w-100' key={fields} onClick={()=>navigate(`${identity.event_name}`)}>
            <div className='p-md-3 p-3 w-100 d-flex' style={{border: "1.5px solid black", borderRadius: "10px", boxShadow: "5px 5px rgb(205 207 209)"}}>
                <img className="col-3 w-100 p-0" style={{height: "80px", borderRadius: "7px"}} alt="" src={identity.images_url}/> 
                <div className='overflow-auto col'>
                    <div  className='text-truncate overflow-hidden'><b>{identity.event_name}</b></div>
                    <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.event_venue}</div></div>
                    <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.timings} • {identity.date}</div></div>
                    <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.price_range}</div></div>
                </div>
            </div>
          </div>
         </>
           )
        })}
        </div>}
    </div>
    </div>
  )
}
