import React from 'react'
import "../css/ClubsRow.css"

export default function HPClubs(props) {
  return (
  <>
  <div className='col p-2 m-2'>
    <div className="card shadow" style={{minWidth: "14rem", maxWidth: "21rem", borderRadius: "20px"}}>
      <img src="https://www.alux.com/wp-content/uploads/2014/09/Best-Nightclubs-In-Miami-Top-10-LIV.jpeg"  className="card-img-top p-2" style={{borderRadius: "22px"}} alt="..."/>
      <div className="p-2">
        <div className='d-flex'>
          <h5 className="card-title m-0"><strong>{props.identity.name}</strong></h5>
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
