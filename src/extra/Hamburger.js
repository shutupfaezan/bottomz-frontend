import React, { useCallback } from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {useLocation} from "react-router-dom";


export default function Hamburger() {
  const navigate = useNavigate()
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset);
    });
  }, []);
  const location = useLocation();

  const handleNavigate = useCallback((path) => {
    navigate(path)
  }, [navigate])

  const handleLogout = useCallback(() => {
    sessionStorage.clear()
    window.location.reload()
  }, [])

  return (
    <>
    <i className="fa-solid fa-bars  align-items-center justify-content-end" style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black", fontSize: "30px", cursor: 'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>

      <div className="offcanvas offcanvas-end" style={{width: "100%", height: "auto"}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"  data-bs-no-jquery  data-bs-backdrop="false" data-bs-scroll="false">
        <div className="offcanvas-header" style={{justifyContent: "start"}}>
          <a className="navbar-brand mx-md-5 py-0 mr-auto" style={{fontWeight: "800"}} href="/">
            <h3 className="primary-header m-0"  style={{ color:"black", fontSize: "25px"}}>BottmzUp</h3>
          </a>
          <small className='mb-0 text-black px-4 py-2 text-white' style={{ borderRadius: "10px",background: "black"}}>Sign Up</small>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body py-4">
          <ul className="pl-4" style={{fontSize: "16px", lineHeight: "3rem", fontWeight: "100"}}>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/all-clubs')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Clubs</li>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/all-events')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Events</li>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/host-with-us')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Host with us</li>
            <li style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Your Tickets</li>
            {sessionStorage.token && <p onClick={handleLogout} style={{color: "red", cursor: "pointer", fontSize: "19px"}}>Log Out</p>}
          </ul>
        </div>
      </div>
    </>
  )
}
