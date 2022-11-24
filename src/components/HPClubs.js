import React from 'react'
import "../css/ClubsRow.css"

export default function HPClubs(props) {
  return (
  <>
  <div className='col p-2 m-2'>
    <div className="card shadow" style={{width: "14rem", borderRadius: "20px"}}>
    <img src="https://www.alux.com/wp-content/uploads/2014/09/Best-Nightclubs-In-Miami-Top-10-LIV.jpeg"  className="card-img-top" alt="..."/>
    <div className="p-3">
      <div className='d-flex'>
        <h5 className="card-title m-0">{props.identity.name}</h5>
        <i className=" ml-auto bi bi-heart"></i>
      </div>
      <small>{props.identity.area}</small>
      <div className="mt-2 d-flex" style={{color: "#ffbe5b"}}><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "warning"}}></i>{props.identity.rating}<small className="ml-auto" style={{color: "grey"}}>Starting from ₹{props.identity.cost}</small></div>
    </div>
    </div>
    </div>
  </>
  )
}
