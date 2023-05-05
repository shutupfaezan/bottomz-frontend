import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"


export default function PromoterSidebar() {

  return (
    <>
      <div class="d-flex flex-column flex-shrink-0 p-lg-3">
        <Link to="/promoter-dashboard" class="d-flex flex-column mb-3 m-2 mb-lg-0 me-lg-auto link-dark text-decoration-none">
          <span class="primary-header mr-2" style={{color: "transparent", WebkitTextStroke: "0.5px black", fontSize: "40px"}}>Promoter</span>
          <span class="primary-header" style={{fontSize: "40px"}}>Portal</span>
        </Link>
      <div className='d-flex d-lg-block w-100 overflow-scroll'>
        <div class="nav nav-pills flex-column col-11 col-md-6 col-lg p-0">
          <div className='p-2 p-md-3 p-lg-0'>
          <small className='nav-link mt-0 pl-1 pb-0 ' style={{color: "black", fontSize: "14px"}}>Events</small>
          <div className='d-flex d-lg-block w-100'>
          <Link to="/host-an-event" class="nav-link my-2 mb-md-3 mr-2 p-3 d-flex flex-column d-lg-block col col-lg-11 mr-md-3" style={{color: window.location.hash === "#/host-an-event" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.hash === "#/host-an-event" ? "black" : "white", boxShadow:  window.location.hash === "#/host-an-event" ? "5px 5px #E04949": null}} aria-current="page">
          <i class="bi bi-collection-play mr-2"></i>Host With Us
          </Link>
          <Link to="/promoter-events" class="nav-link my-2 mb-md-3 mr-2 p-3 d-flex flex-column d-lg-block col col-lg-11"style={{color: window.location.hash === "#/promoter-events" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.hash === "#/promoter-events" ? "black" : "white", boxShadow:  window.location.hash === "#/promoter-events" ? "5px 5px #E04949": null}}>
            <i class="bi bi-columns-gap mr-2"></i><span>All Events</span>
          </Link>
          </div>
          </div>
        </div>
      <div class="nav nav-pills flex-column col-11 col-md-6 col-lg p-0 mt-auto">
        <div className='p-2 p-md-3 p-lg-0'>
        <small className='nav-linkmt-0 pl-1 pb-0 mt-lg-3' style={{color: "black", fontSize: "14px"}}>Account</small>
        <div className='d-flex d-lg-block w-100'>
        <Link to="/contact-us" class="nav-link my-2 mb-md-3 p-3 mr-2 d-flex flex-column d-lg-block col col-lg-11 mr-md-3" aria-current="page" style={{color: "black", border: "2px solid black", borderRadius: "10px"}}>
        <i class="bi bi-question-circle mr-2"></i>Help
        </Link>
          <Link to="/" onClick={()=>{sessionStorage.clear()}} class="nav-link my-2 mb-md-3 mr-2 p-3 d-flex flex-column d-lg-block col col-lg-11" style={{color: "black", border: "2px solid black", borderRadius: "10px"}}>
          <i class="bi bi-box-arrow-left mr-2" style={{fontWeight: "800"}}></i>Sign Out
          </Link>
          </div>
      </div>
      </div>
      <div class="nav nav-pills flex-column col-11 col-md-6 col-lg p-0 mt-2">
        <div className='p-2 p-md-3 p-lg-0'>
        <small className='nav-linkmt-0 pl-1 pb-0 mt-lg-3' style={{color: "black", fontSize: "14px"}}>Utility</small>
        <div className='d-flex d-lg-block w-100'>
        <Link to="/qr-scanner" class="nav-link my-2 mb-md-3 p-3 mr-2 d-flex flex-column d-lg-block col-6 col-lg-11 mr-md-3" aria-current="page" style={{color: window.location.hash === "#/qr-scanner" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.hash === "#/qr-scanner" ? "black" : "white", boxShadow: window.location.hash === "#/qr-scanner" ? "5px 5px #E04949": null}}>
        <i class="fa-solid fa-qrcode mb-2 mr-2"></i>QR Scanner
        </Link>
          </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}
