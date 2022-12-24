import React, { useState, useEffect} from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'
import "../css/AllEvents.css"
import Header from '../common/Header'


export default function AllEvents() {
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
    <><Header/>
    {loading && 
    <div className='d-flex mt-3 justify-content-center mt-auto'>
      <div className="my-auto spinner-border text-info " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    }
    {!loading &&
    <div className='d-flex'>
      <div className='col-lg-8'>
        <div className='col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3" role="search">
            <input className="form-control" type="search" style={{borderRadius: "20px", border: "1px solid black"}} placeholder="Search Your Mind..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "8px", width: "0px"}}></i>   
          </form>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
          {recentEvents?.data.map((fields, index )=> {
            return <RenderEvents key={index} identity={fields}></RenderEvents>
          })}
        </div>    
      </div>
    </div>
    }
    </>
  )
}
