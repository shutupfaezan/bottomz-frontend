import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../css/Header.css"

export default function Header() {
  const navigate = useNavigate()
  return (
    <>
      <div className="d-flex align-items-center" style={{background: `url('${process.env.PUBLIC_URL}/images/purplecanvas.jpeg') no-repeat center/cover`, height: "300px" }}>
        <nav className="navbar navbar-expand navbar-light align-items-center headerback position-absolute w-100" style={{top: "0px"}}>
          <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp.com</a>
        <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
          <ul className="navbar-nav ml-md-auto mr-2">
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 ml-2 text-white" style={{fontSize: "19px"}} to="/all-clubs">Clubs</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/all-events" >Events</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/">Host With Us</Link>
            </li>
          </ul>
          <i className="bi bi-person-circle pt-2 ml-auto ml-md-0" onClick={()=>{navigate('/stranger-login')}}style={{fontSize: "25px"}}></i>
        </div>
        </nav>
        <div className='d-flex flex-column w-100'>
          <h3 className='d-flex justify-content-center text-white align-self-center text-center' style={{fontWeight: "800"}}>Experiences of a Lifetime</h3>  
          <div className='w-100'>
            <form className="d-flex justify-content-center" role="search">
                <input className="form-control w-75" type="search" style={{height: "50px", border: "1px solid black"}} placeholder="Search Any Event, Club or Area.." aria-label="Search"/>
                <i className="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "15px", width: "0px"}}></i>   
            </form> 
          </div>
        </div>
      </div>
    </>
  )
}
