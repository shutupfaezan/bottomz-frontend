import React from 'react'
import "../css/ClubsRow.css"
import { useNavigate } from 'react-router-dom'


export default function HPClubs(props) {
  const navigate = useNavigate()

  return (
  <>
  <div className='col p-2 m-2' onClick={()=>{navigate("all-clubs/" + props.identity.name)}}>
    <div className="card shadow" style={{minWidth: "14rem", maxWidth: "21rem", borderRadius: "20px"}}>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "22px", height: "163px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title m-0">{props.identity.name}</h5>
          <i className=" ml-auto bi bi-heart"></i>
        </div>
        <p className='m-0' style={{fontSize: "13px"}}>{props.identity.area}</p>
        <div className="mt-1 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
      </div>
    </div>
  </div>
  </>
  )
}
