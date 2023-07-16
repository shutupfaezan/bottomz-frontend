import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import "../css/Header.css"
import Hamburger from '../extra/Hamburger';
import { SingularContext } from '../contexts/Context';
import {useLocation} from "react-router-dom";

export default function GlobalHeader() {
  const navigate = useNavigate()
  const {setShow } = useContext(SingularContext);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset);
    });
  }, []);
  const location = useLocation();
  function modalswitch(){
    if(sessionStorage.token){
      setShow(false)
    }
    else{
      navigate("/login")
    }
  }
  return (
    <>  
        <nav className={location.pathname === '/' ? (scroll > 0 ? "navbar navbar-expand navbar-light align-items-center headerback w-100 py-3 py-md-3 px-3 px-lg-5 px-md-3 scrolled" : "navbar navbar-expand navbar-light align-items-center headerback w-100 py-3 py-md-3 px-3 px-lg-5 px-md-3") : "navbar navbar-expand navbar-light align-items-center headerback w-100 py-3 py-md-3 px-3 px-lg-5 px-md-3 scrolled"} style={{position: location.pathname === '/' ? "fixed": "static", top: "0px", zIndex: "3", backgroundColor: location.pathname === '/' ? (scroll > 0 ? "white" : "transparent") : "white", transition: "background-color 0.3s ease-in-out", color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>
        <a className="navbar-brand mx-md-3 py-0 d-flex" style={{fontWeight: "800"}} href="/">
          <img className="mr-2" src={location.pathname === '/' ? (scroll > 0 ? "https://i.ibb.co/0Khndm7/Mediamodifier-Design-Template-19-3.png" : "https://i.ibb.co/nMfQLmf/Mediamodifier-Design-Template-18-2.png") : "https://i.ibb.co/0Khndm7/Mediamodifier-Design-Template-19-3.png"} style={{width: "160px", height: '35px'}} alt=""/>
        </a>
        <div className="align-items-center collapse navbar-collapse text-black" id="navbarSupportedContent">
        <ul className="navbar-nav mr-2">
            <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link className="nav-link p-2 mx-2" style={{fontSize: "19px"}} to="/clubs"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Clubs</small></Link>
            </li>
            <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link className="nav-link p-2 mx-2" style={{fontSize: "19px"}} to="/events"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Events</small></Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link p-2 mx-2" style={{fontSize: "19px"}} to="/contact-us"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Help</small></Link>
            </li>
          </ul>
            <div className="nav-item active d-none d-md-block hover-underline-animation ml-auto mr-2">
              <Link className="nav-link p-2 mx-2" style={{fontSize: "19px", color: "black"}} to="/contact-us"><small style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>Sell</small></Link>
            </div>
            <div className="dropleft d-md-block d-none">
          {sessionStorage?.username ?  
          <div className="dropdown">
          <p style={{fontSize: "19px", color: "black", margin: "0px"}}  data-bs-toggle="dropdown" aria-expanded="false">
          <small className="mb-0 text-black hover-underline-animation cursor-pointer" style={{ color: location.pathname === '/' ? (scroll > 0 ? "black" : "white") : "black"}}>
            {sessionStorage?.username}
          </small>
          </p>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/order-history" style={{fontWeight: "700"}}><i className="fa-solid fa-ticket mr-2"></i>Tickets</Link></li>
            <li><Link onClick={()=>{sessionStorage.clear(); window.location.reload(); window.location.href('/')}} style={{color: "red", fontWeight: "700"}} className="dropdown-item" to="/"><i className="fa-solid fa-right-from-bracket mr-2"></i>Log Out</Link></li>
          </ul>
        </div>
           : <p className="m-0 mr-md-4 ml-md-auto" style={{fontSize: "19px", cursor: "pointer"}}  onClick={modalswitch}><small className="profile-login-btn" style={{border: location.pathname === '/' ? (scroll > 0 ? "2px solid black" : "2px solid white") : "2px solid black", padding: "5px 35px", borderRadius: "20px"}}>Log In</small></p>}
          </div>
          <div className="ml-auto d-md-none d-flex align-items-center">
          {!sessionStorage?.username ? <i style={{fontSize: "30px"}} className="fa-regular fa-circle-user mr-2"></i> : <p className="m-0 rounded-circle d-flex justify-content-center align-items-center mr-2 mt-0" style={{width: "30px", height: "30px", border: location.pathname === '/' ? (scroll > 0 ? "2px solid black" : "2px solid white") : "2px solid black"}}>{sessionStorage?.username.slice(0,1)}</p>}
          </div>
          <div className="d-md-none d-block">
            <Hamburger/>
          </div>
        </div>
        </nav>
    </>
  )
}
