import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <>
  <nav className="navbar navbar-expand navbar-light bg-white align-items-center headerback">
    {/* <a className="navbar-brand" href="#">BottmsUp</a> */}
    <img src={process.env.PUBLIC_URL + "/images/doers-solutions.jpg"} width="120" height="40" alt=""/>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-md-auto mr-2">
        <li className="nav-item active d-none d-md-block hover-underline-animation">
          <Link className="nav-link pb-0 ml-2" style={{fontWeight: "800", fontSize: "19px"}} to="/all-clubs">Clubs</Link>
        </li>
        <li className="nav-item active d-none d-md-block hover-underline-animation">
          <a className="nav-link pb-0 " style={{fontWeight: "800", fontSize: "19px"}} href="/all-events" >Events</a>
        </li>
        <li className="nav-item active   d-block hover-underline-animation">
          <a className="nav-link pb-0" style={{fontWeight: "800", fontSize: "19px"}} href="/">Host With Us</a>
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
