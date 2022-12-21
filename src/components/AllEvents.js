import React, { useState, useEffect, useContext} from 'react'
import RenderEvents from './RenderEvents'
import axios from 'axios'
import "../css/AllEvents.css"
import { SingularContext } from "../contexts/Context";
import Header from "../common/Header"
import TCStatic from './TCStatic';


export default function AllEvents() {
  const {hitRun, runInfo} = useContext(SingularContext);
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
    <Header/>
    {loading && <div className='d-flex justify-content-center mt-auto'>
    <div className="my-auto spinner-border text-info " role="status">
    <span className="sr-only">Loading...</span>
    </div>
    </div>}
    {!loading &&
    <div className='d-flex'>
    <div className='col-md-4'>
    <form className="d-flex" role="search">
        <input className="form-control" type="search" style={{borderRadius: "20px", border: "1px solid black"}} placeholder="Search Your Mind..." aria-label="Search"/>
        <i className="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "8px", width: "0px"}}></i>   
      </form> 
        <div className='d-flex flex-wrap justify-content-center'>
      {recentEvents?.data.map((fields, index )=> {
        return <RenderEvents key={index} identity={fields}></RenderEvents>
      })}
      </div>  
    </div>
    <div  className='col-lg-4 d-none d-md-block'>
    {hitRun && <><div className='mt-5 d-flex'>
      <img src={runInfo?.images_url} style={{width: "40%", borderRadius: "10px"}} alt=''></img>
      <div className='ml-4'>
      <h3 className='align-items-center '><strong>{runInfo?.event_name}</strong></h3>
      <div className="p-2" style={{border: "2px solid #80808024", background: "rgb(125 124 123 / 8%)", borderRadius: "13px"}}> 
        <p className='m-2'><i className="bi bi-geo-alt mr-2"></i>{runInfo?.event_venue}</p>
        <p className='m-2'><i className="bi bi-clock-history mr-2"></i>{runInfo?.timings}</p>
        <p className='m-2'><i className="bi bi-calendar mr-2"></i>{runInfo?.date}, {runInfo?.day}</p>
        <p className='m-2'><i className="bi bi-bookmark mr-2"></i>{runInfo?.genre}</p>
        <p className='m-2'><i className="bi bi-cash-stack mr-2"></i>{runInfo?.price}</p>
      </div>
      </div>
      </div>
       <div className="accordion accordion-flush mt-4" id="accordionFlushExample">
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
             <TCStatic/>
             </div>
         </div>
       </div>
     </div>
     </>
      }
         
      </div>
      </div>
    }
    </>
  )
}
