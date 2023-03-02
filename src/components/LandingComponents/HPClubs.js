import React from 'react'
import "../../css/ClubsRow.css"
import { useNavigate } from 'react-router-dom'


export default function HPClubs(props) {
  const navigate = useNavigate()

  return (
  <>
  <div className='p-2 m-md-0 col-lg-4 col-md-6 m-lg-0' onClick={()=>{navigate("all-clubs/" + props.identity.club_name)}}>
    <div className="card w-100" style={{ borderRadius: "10px"}}>
      <img src={props.identity.images_url}  className="card-img-top p-3" style={{borderRadius: "22px", height: "169px"}} alt="..."/>
      <div className="px-3 mb-3">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title text-truncate m-0 mb-1" style={{fontWeight: "700"}}>{props.identity.club_name}</h5>
        <div className="mt-1 d-flex align-items-center"><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "#ffbe5b"}}></i>{props.identity.rating}</div>
        </div>
        <p className='m-0 mt-1' style={{fontSize: "14px"}}><small><i className="bi bi-geo mr-2"></i>{props.identity.area}</small></p>
        <div className='d-flex justify-content-between'>
          <p className='m-0' style={{fontSize: "14px"}}><small><i className="bi bi-clock mr-2"></i>{props.identity.opening_time}</small></p>
          <p className='m-0' style={{fontSize: "14px"}}><small><i className="bi bi-currency-rupee"></i>{props.identity.cost}</small></p>
          </div>
          <button className="btn btn-dark rounded-pill mt-4 mr-1" style={{padding: "8px 25px", background: "black"}}>Book Now</button>
      </div>
    </div>
  </div>
  </>
  )
}
