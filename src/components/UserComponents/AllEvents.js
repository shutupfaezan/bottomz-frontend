  import React, { useState, useEffect} from 'react'
  import GlobalHeader from '../../common/GlobalHeader'
  import Footer from "../../common/Footer"
  import RenderEvents from '../UserComponents/RenderEvents'
  import axios from 'axios'
  import "../../css/AllEvents.css"
  import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';

  export default function AllEvents() {
const [searchTerm, setSearchTerm] = useState('')
  const [recentEvents, setRecentEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get("https://nightlife-2710.herokuapp.com/events")
      setRecentEvents(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setFilteredEvents(
      recentEvents.filter(event =>
        event.event_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, recentEvents])

  const result = {}
  for (const obj of filteredEvents) {
    const key = obj.date
    if (!result[key]) {
      result[key] = [obj]
    } else {
      result[key].push(obj)
    }
  }

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-")
    const date = new Date(year, month - 1, day)
    const options = {year: 'numeric', month: 'long', day: 'numeric', weekday: "long" }
    return date.toLocaleDateString('en-US', options)
  }
    return (
      <>
      <div className='100vh position-relative'>
      <GlobalHeader/>
      <div className='svgbg mb-5 mb-2 mb-md-3' style={{height: "200px"}}></div>
      <BrowserView>
<div className='d-md-flex justify-content-between position-absolute align-items-center w-100 px-4' style={{top: '125px'}}>
        <div className='d-flex justify-content-center px-5 mx-lg-4 mx-md-2'>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
          <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Events</div>
        </div>
        <div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 mx-md-4" role="search">
            <input className="form-control py-4" type="search" style={{borderRadius: "20px", fontSize: "20px", border: "0.5px solid black", paddingLeft: "45px"}} onChange={(event)=>setSearchTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "10px", width: "0px", fontSize: "20px"}}></i>
          </form>
        </div>
</div>
</BrowserView>
<TabletView>
<div className='d-md-flex justify-content-between position-absolute align-items-center w-100 px-4' style={{top: '125px'}}>
        <div className='d-flex justify-content-center px-5 mx-lg-4 mx-md-2'>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
          <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Events</div>
        </div>
        <div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 mx-md-4" role="search">
            <input className="form-control py-4" type="search" style={{borderRadius: "20px", fontSize: "20px", border: "0.5px solid black", paddingLeft: "45px"}} onChange={(event)=>setSearchTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "10px", width: "0px", fontSize: "20px"}}></i>
          </form>
        </div>
      </div>
</TabletView>
<MobileOnlyView>
<div className='d-md-flex justify-content-between position-absolute align-items-center w-100 px-4' style={{top: '100px'}}>
        <div className='d-flex justify-content-center px-5 mx-lg-4 mx-md-2'>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
          <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Events</div>
        </div>
        <div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 mx-md-4" role="search">
            <input className="form-control py-4" type="search" style={{borderRadius: "20px", fontSize: "20px", border: "0.5px solid black", paddingLeft: "45px"}} onChange={(event)=>setSearchTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "10px", width: "0px", fontSize: "20px"}}></i>
          </form>
        </div>
      </div>
</MobileOnlyView>
      <div className="d-flex flex-wrap my-5">
      {Object.entries(result)?.map(([date, objects]) => (
          <div className="w-100 px-lg-5" key={date}>
            <b className='px-md-5 px-2 ml-2'>{formatDate(date)}</b>
            <div className='d-md-flex w-100 px-md-5'>
              {objects.map((obj, index) => (
                  <RenderEvents identity={obj} index={index}></RenderEvents>
              ))}
            </div>
          </div>
        ))}
        </div>
        <Footer/>
      </div>
      </>
    )
  }
