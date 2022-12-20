import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <>
  <nav className="navbar navbar-expand navbar-light align-items-center headerback" style={{background: "#313444"}}>
    <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp.com</a>
    {/* <img src={process.env.PUBLIC_URL + "/images/doers-solutions-removebg-preview.png"} width="120" height="40" alt=""/> */}

    <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
      <ul className="navbar-nav ml-md-auto mr-2">
        <li className="nav-item active d-none d-md-block hover-underline-animation">
          <Link className="nav-link pb-0 ml-2 text-white" style={{fontSize: "19px"}} to="/all-clubs">Clubs</Link>
        </li>
        <li className="nav-item active d-none d-md-block hover-underline-animation">
          <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/all-events" >Events</Link>
        </li>
        <li className="nav-item active d-block hover-underline-animation">
          <a className="nav-link pb-0 text-white" style={{fontSize: "19px"}} href="/">Host With Us</a>
        </li>
        {/* <li className="nav-item active ">
          <a className="nav-link ml-2 ml-md-0 pb-0 hover-underline-animation" style={{fontWeight: "800", fontSize: "19px"}} href="/">Randomize</a>
        </li>
        <li className="nav-item active ">
          <a className="nav-link ml-2 ml-md-0 pb-0 hover-underline-animation" style={{fontWeight: "800", fontSize: "19px"}} href="/">Meet Cute</a>
        </li> */}
      </ul>
      <i className="bi bi-person-circle pt-2 ml-auto ml-md-0" onClick={()=>{navigate('/stranger-login')}}style={{fontSize: "25px"}}></i>
    </div>
  </nav>
    </>
  )
}
