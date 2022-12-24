import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../css/Header.css"

export default function GlobalHeader() {
  const navigate = useNavigate()

  return (
    <>
        <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100" style={{background: "#0e69d3", color: "white"}}>
        <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp.com</a>
        <div className="collapse navbar-collapse text-black" id="navbarSupportedContent">
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
            </ul>
            <i class="bi bi-search ml-auto ml-md-0 mr-4 mt-2" style={{fontSize: "20px"}}></i>
            <i className="bi bi-person-circle pt-2  ml-md-0" onClick={()=>{navigate('/stranger-login')}}style={{fontSize: "25px"}}></i>
        </div>
        </nav>
    </>
  )
}
