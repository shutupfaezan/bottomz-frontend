import React, { useState, useEffect} from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'
import "../css/AllEvents.css"
import GlobalHeader from '../common/GlobalHeader'

export default function AllEvents() {
  const [searchTerm, setSearhTerm] = useState()
  const [recentEvents, setRecentEvents] = useState()
  const [loading, setLoading] = useState(true)
  const  eventData = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/events")}
    
    useEffect(() => {
      eventData()
        .then((response) => {
          setLoading(false)
          setRecentEvents(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    
  return (
    <>
    <div>
    <GlobalHeader/>
    {loading && <div className='d-flex justify-content-center' style={{marginTop: "75px"}}>
    <div className='d-flex align-items-center'>
    <span style={{fontSize: "35px"}}>Loading </span>
    <div className="my-auto spinner-border text-black " role="status">
    </div>
    </div>
    </div>}
    {!loading &&
    <div className='d-flex'>
      <div className='col-lg-8'>
        <div className='col-md-7 p-0'>
          <form className="d-flex mb-3" style={{marginTop: "75px"}} role="search">
            <input className="form-control" type="search" style={{borderRadius: "20px", border: "0.5px solid black"}} placeholder="Search Event or Venue..." onChange={(event)=>setSearhTerm(event.target.value)} aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "7px", width: "0px"}}></i>
          </form>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
        {/* eslint-disable-next-line */}
          {recentEvents?.data?.filter((val)=>{
            if(searchTerm === undefined){
              return val
            }
            else if(searchTerm === ""){
              return val
            }
            else if(val.event_name.toLowerCase().includes(searchTerm?.toLowerCase())){
              return val
            }
            else if(val.event_venue.toLowerCase().includes(searchTerm?.toLowerCase())){
              return val
            }
            
          }).map((fields, index )=> {
            return <RenderEvents key={index} identity={fields}></RenderEvents>
          })
          }
        </div>    
      </div>
    </div>
    }
    </div>
    </>
  )
}
