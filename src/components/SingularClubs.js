import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import HPEvents from './HPEvents';

export default function SingularClubs() {
const [clubVariable, setClubVariable] = useState()
const [eventsVariable, setEventVariable] = useState()
    const params = useParams()
    const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
    
    useEffect(() => {
        club()
        .then((response) => {
            setClubVariable(response?.data[0].Club_info)
            setEventVariable(response?.data[0].Event_info)
        })
        .catch((error) => {
            console.log(error);
        });
        //eslint-disable-next-line
    }, []);

  return (
    <>
    <MobileOnlyView>
      <Carousel showThumbs={false}>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src="https://www.abinet.org/wp-content/uploads/2017/03/Matahaari.png" alt=''/>
        </div>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src="https://tse3.mm.bing.net/th?id=OIP.yA0-7dKdfVQYrSUfQ4anaQHaE-&pid=Api&P=0" alt=''/>
        </div>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src="https://d4t7t8y8xqo0t.cloudfront.net/eazymedia/restaurant%2F643499%2Frestaurant520190430051513.jpg" alt=''/>
        </div>
      </Carousel>
      <div className='p-2 ml-1'>
       <div className='d-flex align-items-center'>
      <h1><strong>{clubVariable?.club_name}</strong></h1>
      <i className="bi bi-heart mr-3 ml-auto" style={{fontSize: "25px", color: "warning"}}></i>
      </div>
      <div className='d-flex'>
      <i class="bi bi-geo-alt mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "60%", margin: "0"}}>Doctor Annie Besant Road, Worli, Mumbai, Maharashtra 400018</p>
      </div>
      <div className='d-flex'>
      <i class="bi bi-clock mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "60%"}}>Timings: 9:00pm-1:30pm</p>
      </div>
      </div>
      <p className="ml-2 mb-0" style={{color: "rgb(198, 21, 177)"}}><strong>Events</strong></p>
      <hr className=' ml-2 mt-0'/>
      <div className=''>
        <div className='d-flex d-md-block flex-column align-items-center'>{eventsVariable?.map((fields, index )=> {
          return <HPEvents className="col shadow-lg" key={index} identity={fields}></HPEvents>
        })}
        </div>
      </div>
    </MobileOnlyView>
    </> 
  )
}
