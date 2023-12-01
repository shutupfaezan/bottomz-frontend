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
      <div className=''>
      <GlobalHeader/>
        <section className="p-2" style={{height: "450px"}}>
          <div style={{height: "100%"}} >
            <img style={{height: "100%", objectFit: "cover", width: "100%", borderRadius: "20px"}} src={process.env.PUBLIC_URL + "/images/AllEventsheaderImg.png"}></img>
          </div>
          <div>
          </div>
        </section>
        <Footer/>
      </div>
      </>
    )
  }
