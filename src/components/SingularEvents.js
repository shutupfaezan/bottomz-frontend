    import React, { useEffect, useState } from 'react'
    import axios from 'axios'
    import { useParams } from "react-router-dom";

    export default function SingularEvents(props){
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
          <div className='w-100' style={{height: "230px"}}>
            <div className='position-absolute d-flex' style={{top: "0", height: "230px"}} >
              <img className="my-auto ml-3 mr-3 rounded-lg" src='https://cdn.mycreativeshop.com/images/templates/18437/club-grand-opening-poster-template-34184-flat1-thumb.jpg'  style={{width: "35%"}} alt=""/>
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
          <div className="accordion accordion-flush d-md-none " id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" style={{color: "black", background: "white"}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                 <strong>About</strong>
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button collapsed" style={{color: "black", background: "white"}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                <strong>Terms & Conditions</strong>
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body"><li className='m-1'><small>DJ/Promoters guestlist on discounted rate for entry. Guestlist shuts at 10.30pm</small></li>
                  <li className='m-1'><small>Without pre booking, walk in tickets will be on different rates as per time slots charged at the venue.</small></li>
                  <li className='m-1'><small>All tickets are single entry only with no cover charge.</small></li>
                  <li className='m-1'><small>21+ Government Issued Identification is needed for entry (physical ID of driver's license or Aadhar Card).</small></li>
                  <li className='m-1'><small>Management reserves the right to refuse entry in accordance with licensing law.</small></li></div>
              </div>
            </div>
          </div>
        </div>
      ) 
    }
