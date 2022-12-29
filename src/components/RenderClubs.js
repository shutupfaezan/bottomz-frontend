import React from 'react'
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import { useNavigate } from 'react-router-dom'

export default function RenderClubs(props) {
 console.log(props)
  const navigate = useNavigate()
  return (
  <>
  <BrowserView className='d-flex flex-column flex-wrap m-2 position-relative' style={{width: "23%"}} onClick={()=>{navigate(props.identity.club_name)}}>
    <div className="card shadow w-100" style={{borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="allclubs card-img-top p-2" style={{borderRadius: "22px", height: "200px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title m-0"><strong>{props.identity.club_name}</strong></h5>
          <i className=" ml-auto bi bi-heart"></i>
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
  </BrowserView>
  <TabletView className='d-flex flex-column flex-wrap m-2 position-relative' style={{width: "47%"}} onClick={()=>{navigate(props.identity.name)}}>
    <div className="card shadow w-100" style={{borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="allclubs card-img-top p-2" style={{borderRadius: "22px", height: "200px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title m-0"><strong>{props.identity.club_name}</strong></h5>
          <i className=" ml-auto bi bi-heart"></i>
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
  </TabletView>
  <MobileOnlyView className='d-flex flex-column flex-wrap m-2 w-100 position-relative' onClick={()=>{navigate(props.identity.name)}}>
    <div className="card shadow w-100" style={{borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="allclubs card-img-top p-2" style={{borderRadius: "22px", height: "200px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title m-0"><strong>{props.identity.club_name}</strong></h5>
          <i className=" ml-auto bi bi-heart"></i>
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
  </MobileOnlyView>
  </>
  )
}
