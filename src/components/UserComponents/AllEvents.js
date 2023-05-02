  import React, { useState, useEffect} from 'react'
  import GlobalHeader from '../../common/GlobalHeader'
  import Footer from "../../common/Footer"
  import RenderEvents from '../UserComponents/RenderEvents'
  import axios from 'axios'
  import "../../css/AllEvents.css"
import CarouselWithInfo from '../../common/CarouselWithInfo'

  export default function AllEvents() {
    // eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState('')
  const [recentEvents, setRecentEvents] = useState([])
  const [loading, setloading] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState([])

  const fetchData = async () => {
    try {
      setloading(true)
      const response = await axios.get("https://nightlife-2710.herokuapp.com/events")
      setRecentEvents(response?.data)
      setloading(false)
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
    const [year, month, day] = dateStr.split("-")
    const date = new Date(year, month - 1, day)
    const options = {year: 'numeric', month: 'long', day: 'numeric', weekday: "long" }
    return date.toLocaleDateString('en-US', options)
  }

    return (
      <>
      {loading && <div className='d-flex justify-content-center mt-auto'>
    <div className='d-flex align-items-center'>
    <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
    </div>
    </div>}
      {!loading && <div className='100vh position-relative'>
      <GlobalHeader/>
      <div className="swipeImprove" style={{background: "black", color: "white"}}>
        <CarouselWithInfo items={recentEvents}></CarouselWithInfo>
      </div>
      <div className='d-md-flex justify-content-between  align-items-center w-100 px-lg-5 px-md-4 mt-4 px-3'>
        <div className='d-flex flex-md-column justify-md-content-center px-lg-4 px-md-3 mx-lg-4 mx-md-2'>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px black", fontSize: "40px"}}>All</div>
          <div className='primary-header ml-2' style={{fontSize: "40px", color: "black"}}>Events</div>
        </div>
        {/* <div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 mx-md-4" role="search">
            <input className="form-control py-4" type="search" style={{borderRadius: "20px", fontSize: "20px", border: "0.5px solid black", paddingLeft: "45px"}} onChange={(event)=>setSearchTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "10px", width: "0px", fontSize: "20px"}}></i>
          </form>
        </div> */}
      </div>
      <div className="d-flex flex-wrap my-3">
      {Object.entries(result)?.map(([date, objects]) => (
          <div className="w-100 px-lg-5" key={date}>
            <b className='px-md-5 px-2 ml-2'>{formatDate(date)}</b>
            <div className='d-md-flex w-100 px-md-5 flex-wrap'>
              {objects.map((obj, index) => (
                  <RenderEvents identity={obj} index={index} key={index}></RenderEvents>
              ))}
            </div>
          </div>
        ))}
        </div>
        <Footer/>
      </div>}
      </>
    )
  }
