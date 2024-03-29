import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PromoterSidebar from '../../common/PromoterSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../common/Footer"

export default function PromoterOngoingOrders() {
const navigate = useNavigate()
const [eventData, setEventData] = useState()
const [isLoading, setIsLoading] = useState(true)

const fetchData = async () => {
  try {
    const response = await axios.get(`https://nightlife-2710.herokuapp.com/fetch-promoter-events-history?promoter_access_token=${sessionStorage?.promoter_token}`)
    setEventData(response.data)
    setIsLoading(false)
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchData()
}, [])


const result = {}
for (const obj of eventData?.length > 0 ? eventData : []) {
  const key = obj?.date
  if (!result[key]) {
    result[key] = [obj]
  } else {
    result[key].push(obj)
  }
}
const formatDate = (dateStr) => {
  const [year, month, day ] = dateStr.split("-")
  const date = new Date(year, month - 1, day)
  const options = {year: 'numeric', month: 'long', day: 'numeric', weekday: "long" }
  return date.toLocaleDateString('en-US', options)
}

  return (
    <div className='100vh position-relative'>
    <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
      <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
      </nav>
    <div className='d-lg-flex px-lg-5 mb-4 p-3'>
      <div className='col-lg-3 p-0'>
        <PromoterSidebar/>
      </div>
    <div className='col-lg-9 p-0'>
        <h1 className='my-lg-5 mb-5 ml-2 text-center primary-header' style={{color: "#E04949"}}>All Events</h1>
        {isLoading && <div className='d-flex justify-content-center mt-auto' style={{height: "50vh"}}>
          <div className='d-flex align-items-center'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
          </div>
          </div>}
        {!isLoading && <div className='d-flex flex-wrap'>
        {Object.entries(result)?.map(([date, objects]) => (
          <div className="w-100 px-lg-2 mt-2" key={date}>
            <b className='px-md-2 px-2 ml-2'>{formatDate(date)}</b>
            <div className='d-md-flex w-100 px-md-2 flex-wrap'>
              {objects.map((identity, index) => {
               const formatDate = (dateStr) => {
                const [day, month, year] = dateStr.split("-");
                const date = new Date(year, month - 1, day);
                const options = { day: 'numeric', month: 'short' };
                return date.toLocaleDateString('en-US', options);
              }           
               return(
                <>
               <div className='col-md-6 p-2 w-100' key={index} onClick={()=>navigate(`${identity.event_name}`)}>
                <div className='p-md-3 p-3 w-100 d-flex' style={{border: "1.5px solid black", borderRadius: "10px", boxShadow: "5px 5px rgb(205 207 209)"}}>
                    <img className="col-3 w-100 p-0" style={{height: "80px", borderRadius: "7px"}} alt="" src={identity.images_url}/> 
                    <div className='overflow-auto col'>
                        <div  className='text-truncate overflow-hidden'><b>{identity.event_name}</b></div>
                        <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.event_venue}</div></div>
                        <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.timings} • {formatDate(identity.date)}</div></div>
                        <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{identity.price_range}</div></div>
                    </div>
                </div>
              </div>
             </>
               )
               })}
            </div>
          </div>
        ))}
        </div>
}
    </div>
    </div>
    <Footer/>
    </div>
  )
}
