import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react';
// import { SingularContext } from '../contexts/Context';

export default function Hamburger() {
  // const {setShow, setSignActive, setLoginActive} = useContext(SingularContext);
  const navigate = useNavigate()
  return (
    <>
    <i className="bi bi-list mr-3 align-items-center text-white" style={{fontSize: "30px", cursor: 'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
    <div className="offcanvas offcanvas-start" style={{width: "250px", height: "auto"}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div className="offcanvas-header">
    <a className="navbar-brand" style={{fontWeight: "800", color: "#881070", fontSize: "25px"}} href="/">BottmzUp</a>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
        <div>
          <p data-bs-dismiss="offcanvas" onClick={()=>{navigate('/all-clubs')}} style={{cursor: "pointer", fontSize: "19px"}}>Clubs</p>
          <p data-bs-dismiss="offcanvas" onClick={()=>navigate("/all-events")} style={{cursor: "pointer", fontSize: "19px"}}>Events</p>
          <p data-bs-dismiss="offcanvas" onClick={()=>navigate("/host-with-us")} style={{cursor: "pointer", fontSize: "19px"}}>Host with us</p>
        </div>
        {/* {!localStorage.token && <><hr></hr>
        <div>
          <p style={{cursor: "pointer"}} data-bs-dismiss="offcanvas" onClick={()=>{setShow(true); setSignActive(false); setLoginActive(true)}}>Log In</p>
          <p style={{cursor: "pointer"}} data-bs-dismiss="offcanvas" onClick={()=>{setShow(true); setSignActive(true); setLoginActive(false)}}>Sign In</p>
        </div></>} */}
        <hr></hr>
        <div>
          <p style={{fontSize: "19px"}}>Your Tickets</p>
          <p style={{fontSize: "19px"}}>Your Events</p>
          <p style={{fontSize: "19px"}}>Favourites</p>
        </div>
        <hr></hr>
        <div>
          <p  style={{fontSize: "19px"}}>Careers</p>
          {localStorage.token && <p onClick={()=>{localStorage.clear(); window.location.reload()}} style={{color: "red", cursor: "pointer", fontSize: "19px"}}>Log Out</p>}
        </div>
      </div>
    </div>
    </>
  )
}
