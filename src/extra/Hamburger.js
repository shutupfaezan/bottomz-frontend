import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Hamburger() {
  const navigate = useNavigate()

  const handleNavigate = useCallback((path) => {
    navigate(path)
  }, [navigate])

  const handleLogout = useCallback(() => {
    sessionStorage.clear()
    window.location.reload()
  }, [])

  return (
    <>
      <div className='rounded-circle d-flex justify-content-center' style={{background: "white", borderRadius: "60px", height: "50px", width: "50px"}}>
      <i className="fa-solid fa-bars  align-items-center justify-content-end align-self-center" style={{ color: "black", fontSize: "25px", cursor: 'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
      </div>
      <div className="offcanvas offcanvas-end" style={{width: "75%", height: "auto", zIndex: "10000", background: "rgba(53, 53, 53, 1)"}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"  data-bs-no-jquery  data-bs-backdrop="false" data-bs-scroll="false">
        <div className="offcanvas-header" style={{justifyContent: "start"}}>
          <a className="navbar-brand mx-md-5 py-0 mr-auto" style={{fontWeight: "800"}} href="/">
            <h3 className="primary-header m-0"  style={{ color:"black", fontSize: "25px"}}>BottmzUp</h3>
          </a>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body py-4">
          <ul className="pl-4" style={{fontSize: "16px", lineHeight: "3rem", fontWeight: "100"}}>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/clubs')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Clubs</li>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/events')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Events</li>
            <li data-bs-dismiss="offcanvas" onClick={() => handleNavigate('/contact-us')} style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}>Host with us</li>
            {sessionStorage.token && <li data-bs-dismiss="offcanvas" style={{cursor: "pointer", fontSize: "20px", color: "#2b2a35", listStyle: "none", fontWeight: "100"}}  onClick={() => handleNavigate('/order-history')}>Your Tickets</li>}
            {sessionStorage.token && <p onClick={handleLogout} style={{color: "red", cursor: "pointer", fontSize: "19px"}}>Log Out</p>}
          </ul>
        </div>
      </div>
    </>
  )
}
