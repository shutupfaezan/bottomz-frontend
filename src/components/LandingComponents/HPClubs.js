import React from 'react'
import "../../css/ClubsRow.css"
import { useNavigate } from 'react-router-dom'
import { BrowserView, MobileView } from 'react-device-detect'


export default function HPClubs(props) {
  const navigate = useNavigate()

  return (
  <>
  <BrowserView className='p-2 m-2 col-lg-4 col-xxl-3 m-lg-0' onClick={()=>{navigate("all-clubs/" + props.identity.club_name)}}>
    <div className="card w-100 shadow" style={{ borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "22px", height: "163px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title text-truncate m-0" style={{width: "90%"}}>{props.identity.club_name}</h5>
          {/* <i className=" ml-auto bi bi-heart"></i> */}
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
  </BrowserView>
  <MobileView className='col p-2 m-2' onClick={()=>{navigate("all-clubs/" + props.identity.club_name)}} >
    <div className="card shadow" style={{minWidth: "14rem", maxWidth: "21rem", borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "22px", height: "163px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title text-truncate m-0" style={{width: "90%"}}>{props.identity.club_name}</h5>
          {/* <i className=" ml-auto bi bi-heart"></i> */}
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
    </MobileView>
  </>
  )
}
