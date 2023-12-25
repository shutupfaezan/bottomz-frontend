import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SingularContext } from '../../contexts/Context';
import {useContext} from 'react'

export default function   HPEvents(props) {
  const {setInputValues, setInputModal} = useContext(SingularContext);
  const navigate = useNavigate()
  // const formatDate = (dateStr) => {
  //   const [year, month, day] = dateStr.split("-")
  //   const date = new Date(year, month - 1, day)
  //   const options = {month: 'short', day: 'numeric' }
  //   return date.toLocaleDateString('en-US', options)
  // }
  
  return (
    <>
      <div onClick={()=>{navigate("/events/" + props.identity.event_name); setInputValues([]); setInputModal(false)}}  style={{height: "370px"}}>
        <div className='w-100 d-flex cursor-pointer position-relative' key={props?.fields} style={{borderRadius: "10px", height: "100%"}}>
          <img className="w-100 p-0 FeaturedEventsCtrl" style={{borderRadius: "20px", height: "100%", objectFit: "cover", background: "#D9D9D9", backgroundColor: "lightgray", backgroundPosition: "50%"}} alt="" src={props.identity.images_url}/>
          <div className='col-4 d-flex justify-content-center' style={{background: `rgba(0, 0, 0, 0.20)`, WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "white", position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "120px", width: "100%", border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "30px" }}>
            <p className='mb-0 py-2'>{props.identity.price_range === "0" ? "Free" : `₹ ${props.identity.price_range.replace("Rs.", "")}`}</p>
          </div>
          <div style={{background: `rgba(0, 0, 0, 0.30)`, WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "white", position: "absolute", left: "0", bottom: "-1px", width: "100%", borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <div style={{padding: "19px 15px"}}>
              <div className='d-flex justify-content-between'>
                <div className="d-flex col-lg-9 col-10 p-0" style={{ gap: "5px", flexDirection: "column" }}>
                  <div className='col d-flex flex-column px-0 w-100'>
                    <div  className='text-truncate overflow-hidden'><b style={{fontWeight: "700", fontSize: "14px", marginBottom: "0px"}}>{props.identity.event_name}</b></div>
                    <div className='d-flex overflow-auto align-items-center mt-2 mb-1'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}><i className="fa-regular fa-paper-plane mr-2"></i>{props.identity.event_venue}</div></div>
                    <div className='d-flex text-truncate mb-1 mb-lg-0'><div style={{fontSize: "0.7rem", fontWeight: "400"}}><i className="fa-regular fa-calendar mr-2"></i>{props.identity.timings.slice(0,9)}</div></div>
                  </div>
                </div>
                <img src={`${process.env.PUBLIC_URL}/images/visitClub.svg`} alt="visit club" style={{ height: "35px", width: "35px", alignSelf: "end"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
