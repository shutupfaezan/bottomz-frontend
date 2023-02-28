import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"


export default function PromoterSidebar() { 
  return (
    <>
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-light w-100" style={{height: "100%"}}>
      <Link to="/promoter-dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <div className='d-flex align-items-center align-items-md-start w-100 flex-md-column'>
        <span class="fs-4">BottmzUp</span>
        <span class="fs-6 ml-auto">Promoter Portal</span>
        </div>
      </Link>
      <hr className='mb-0'/>
      <ul class="nav nav-pills flex-column">
        <small className='nav-link mt-0' style={{color: "#6b6b6b", fontSize: "12px"}}>Events</small>
        <li class="nav-item">
          <Link to="/host-an-event" class="nav-link active" style={{background: "#800aca"}} aria-current="page">
          <i class="bi bi-collection-play mr-2"></i>Host With Us
          </Link>
        </li>
        <li>
          <Link to="/promoter-events" class="nav-link link-dark"> <i class="bi bi-columns-gap mr-2"></i>All Events</Link>
        </li>
      </ul>
      <hr className='mb-0'/>
      <ul class="nav nav-pills flex-column mb-auto">
        <small className='nav-link mt-0'  style={{color: "#6b6b6b", fontSize: "12px"}}>Account</small>
        <li class="nav-item">
          <Link to="/host-an-event" class="nav-link link-dark" aria-current="page">
          <i class="bi bi-question-circle mr-2"></i>Help
          </Link>
        </li>
        <li>
          <a href="/" class="nav-link link-danger">
          <i class="bi bi-box-arrow-left mr-2"></i>Sign Out
          </a>
        </li>
      </ul>
      </div>
    </>
  )
}
