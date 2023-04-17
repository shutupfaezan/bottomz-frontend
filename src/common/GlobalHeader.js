import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import "../css/Header.css"
import CommonModal from './CommonModal'
import Hamburger from '../extra/Hamburger';
import {useLocation} from "react-router-dom";

export default function GlobalHeader() {
  
  const {setShow,show} = useContext(SingularContext);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset);
    });
  }, []);
  const location = useLocation();
  function modalswitch(){
    if(localStorage.token){
      setShow(false)
    }
    else{
      setShow(true)
    }
  }
  return (
    <>
        <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-3   py-md-3 px-3 px-lg-5 px-md-3" style={{position: location.pathname === '/' ? "fixed": "static", top: "0px", zIndex: "3", backgroundColor: location.pathname === '/' ? (scroll > 0 ? "white" : "transparent") : "white", transition: "background-color 0.3s ease-in-out", color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>
        <a className="navbar-brand mx-md-5 py-0" style={{fontWeight: "800"}} href="/"><h3 className="primary-header m-0"  style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>BottmzUp</h3></a>
        <div className="align-items-center collapse navbar-collapse text-black" id="navbarSupportedContent">
        <ul className="navbar-nav mr-2">
            <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link className="nav-link py-0 ml-2 mr-4" style={{fontSize: "19px"}} to="/all-clubs"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Clubs</small></Link>
            </li>
            <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link className="nav-link py-0 mr-4" style={{fontSize: "19px"}} to="/all-events"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Events</small></Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link py-0 mr-4" style={{fontSize: "19px"}} to="/host-with-us"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Help</small></Link>
            </li>
          </ul>
            <div className="nav-item active d-none d-md-block hover-underline-animation ml-auto">
              <Link className="nav-link py-0" style={{fontSize: "19px", color: "black"}} to="/host-with-us"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Sell</small></Link>
            </div>
            <div className="dropleft d-md-block d-none">
          {sessionStorage?.username ?  
          <div className="dropdown">
          <p style={{fontSize: "19px", color: "black", margin: "0px"}}  data-bs-toggle="dropdown" aria-expanded="false">
          <small className="mb-0 text-black" style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>
            {sessionStorage?.username}
          </small>
          </p>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/ticket-info">Tickets</Link></li>
            <li><Link onClick={()=>{sessionStorage.clear(); window.location.reload()}} style={{color: "red"}} className="dropdown-item" to="/">Log Out</Link></li>
          </ul>
        </div>
           : <p className="m-0 mr-md-5 ml-md-3" style={{fontSize: "19px", cursor: "pointer"}}  onClick={modalswitch}><small style={{border: location.pathname === '/' ? (scroll > 0 ? "2px solid black" : "2px solid white") : "2px solid black", padding: "5px 35px", borderRadius: "20px"}}>Log In</small></p>}
          <CommonModal show={show}/>
          </div>
          <div className="ml-auto d-md-none d-flex align-items-center">
          {!sessionStorage?.username ? <i style={{fontSize: "30px"}} onClick={()=>{setShow(true)}} class="fa-regular fa-circle-user mr-1"></i> : <p className="m-0 rounded-circle d-flex justify-content-center align-items-center mr-2 mt-0" style={{width: "30px", height: "30px", border: location.pathname === '/' ? (scroll > 0 ? "2px solid black" : "2px solid white") : "2px solid black"}}>{sessionStorage?.username.slice(0,1)}</p>}
          </div>
          <div className="d-md-none d-block">
            <Hamburger/>
          </div>
        </div>
        </nav>
    </>
  )
}
