import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hamburger() {
  const navigate = useNavigate()
  return (
    <>
    <i className="bi bi-list align-items-center justify-content-end " style={{fontSize: "30px", cursor: 'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
    <div className="offcanvas offcanvas-end" style={{width: "100%", height: "auto"}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div className="offcanvas-header">
    <a className="navbar-brand" style={{fontWeight: "800", color: "#881070", fontSize: "25px"}} href="/">BottmzUp</a>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
        <div>
          <p data-bs-dismiss="offcanvas" onClick={()=>{navigate('/all-clubs')}} style={{cursor: "pointer", fontSize: "19px", color: "black"}}>Clubs</p>
          <p data-bs-dismiss="offcanvas" onClick={()=>navigate("/all-events")} style={{cursor: "pointer", fontSize: "19px", color: "black"}}>Events</p>
          <p data-bs-dismiss="offcanvas" onClick={()=>navigate("/all-events")} style={{cursor: "pointer", fontSize: "19px", color: "black"}}>Events</p>
          <p data-bs-dismiss="offcanvas" onClick={()=>navigate("/host-with-us")} style={{cursor: "pointer", fontSize: "19px", color: "black"}}>Host with us</p>
        </div>
        <hr style={{color: "gray"}}></hr>
        <div>
          <p style={{fontSize: "19px" , color: "black"}}>Your Tickets</p>
          <p style={{fontSize: "19px", color: "black"}}>Your Events</p>
          <p style={{fontSize: "19px", color: "black"}}>Favourites</p>
        </div>
        <hr style={{color: "gray"}}></hr>
        <div>
          <p  style={{fontSize: "19px", color: "black"}}>Careers</p>
          {sessionStorage.token && <p onClick={()=>{sessionStorage.clear(); window.location.reload()}} style={{color: "red", cursor: "pointer", fontSize: "19px"}}>Log Out</p>}
        </div>
      </div>
    </div>
    </>
  )
}
