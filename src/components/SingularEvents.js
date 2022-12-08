    import React, { useEffect, useState } from 'react'
    import axios from 'axios'
    import { useParams } from "react-router-dom";

    export default function SingularEvents(props) {
      const [singularEvents, setSingularEvents] = useState()
      const params = useParams()
      const singularEvent = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/fetch-single-event?event_name=${params.event_name}`)};
      useEffect(() => {
        singularEvent()
        .then((response) => {
            setSingularEvents(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
        // eslint-disable-next-line
    }, []);

      return (
        <div>
          <div className='w-100' style={{height: "250px"}}>
          {/* <img src='https://cdn.mycreativeshop.com/images/templates/18437/club-grand-opening-poster-template-34184-flat1-thumb.jpg' style={{height: "100%", filter: "blur(5px)"}} width="100%"/> */}
          </div>
          <div className='position-absolute d-flex' style={{top: "0", height: "250px"}} >
          <img className="my-auto ml-3 mr-2 rounded-lg" src='https://cdn.mycreativeshop.com/images/templates/18437/club-grand-opening-poster-template-34184-flat1-thumb.jpg'  style={{width: "35%", height: "max-content"}} alt=""/>
          <div className='d-flex flex-column my-auto mx-auto'>
          <strong><p className='m-0 text=black' style={{fontSize: "22px"}}>{singularEvents?.event_name}</p></strong>
          <p className='m-0 text=black' style={{fontSize: "12px"}}>Curated by: Wholesome Events</p>
          <p className='m-0 mt-2' style={{fontSize: "15px"}}><i className="bi bi-calendar" style={{fontSize: "18px"}}></i> {singularEvents?.date}, Wednesday</p>
          <p className='m-0' style={{fontSize: "15px"}}><i className="bi bi-clock-history" style={{fontSize: "18px"}}></i> 8.00Pm - 12:00pm</p>
          <p className='m-0' style={{fontSize: "15px"}}><i className="bi bi-tag" style={{fontSize: "18px"}}></i> Free - 5000</p>
          <p className='m-0' style={{fontSize: "15px"}}><i className="bi bi-geo-alt" style={{fontSize: "18px"}}></i> {singularEvents?.event_venue}</p>
          </div>  
          </div>
        </div>
      ) 
    }
