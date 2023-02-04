import React, { useState, useEffect } from "react";
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { BrowserView, MobileView} from 'react-device-detect' 
import { Link } from "react-router-dom"
import "../css/Header.css"
import CommonModal from './CommonModal'
import SearchBar from './SearchBar';
import Hamburger from '../extra/Hamburger';


export default function Header() {
const [scroll, setScroll] = useState(0);
useEffect(() => {
  window.addEventListener("scroll", () => {
    setScroll(window.pageYOffset);
  });
}, []);
const {setShow,show, userAvatar} = useContext(SingularContext);
console.log(userAvatar)
function modalswitch(){
  if(sessionStorage.token){
    setShow(false)
  }
  else{
    setShow(true)
  }
}

  return (
    <>
    <div className='svgbg'  style={{height: "300px", boxShadow: "1px 1px 10px grey"}}></div>
      <div className="d-flex align-items-center">
        <nav className="navbar navbar-expand navbar-light align-items-center headerback position-fixed w-100" style={{top: "0px", zIndex: "2", backgroundColor: scroll > 0 ? "#014765" : "transparent", transition: "background-color 0.3s ease-in-out"}}>
          <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp</a>
        <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
          <ul className="navbar-nav ml-md-auto mr-2">
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 ml-2 text-white" style={{fontSize: "19px"}} to="/all-clubs">Clubs</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/all-events" >Events</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/host-with-us">Sell</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/host-with-us">Help</Link>
            </li>
          </ul>

          <div className="dropleft ml-auto ml-md-0 align-self-end d-md-block d-none">
          {sessionStorage?.username ?  
          <div className="dropdown">
          <p className="mb-0" style={{ background: "transparent", fontSize: "19px"}} data-bs-toggle="dropdown" aria-expanded="false">
            Your Account
          </p>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/favourites">Favorites</Link></li>
            <li><Link className="dropdown-item" to="/ticket-info">Tickets</Link></li>
            <li><Link onClick={()=>{sessionStorage.clear(); window.location.reload()}} style={{color: "red"}} className="dropdown-item" to="/">Log Out</Link></li>
          </ul>
        </div>
           : <p className="m-0" style={{fontSize: "19px", cursor: "pointer"}}  onClick={modalswitch}>Sign In</p>}
          <CommonModal show={show}/>
          </div>
          <div className="ml-auto d-md-none d-block">
          {!sessionStorage?.username ? <i style={{fontSize: "24px"}} onClick={()=>{setShow(true)}} class="fa-regular fa-circle-user mr-1"></i> : <p className="m-0 rounded-circle d-flex justify-content-center align-items-center mr-1" style={{width: "25px", height: "25px", border: "2px solid white"}}>{sessionStorage?.username.slice(0,1)}</p>}
          </div>
          <div className="d-md-none d-block">
            <Hamburger/>
          </div>
        </div>
        </nav>
        <div className='d-flex flex-column w-100 position-absolute' style={{top: "105px"}}>
          <BrowserView>
          <h2 className='d-flex justify-content-center text-white align-self-center text-center mb-2' style={{fontWeight: "800"}}>Clubbing done right</h2>
          <p className='d-flex justify-content-center text-white align-self-center text-center mb-4' style={{fontWeight: "800", fontSize: "20px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>  
          </BrowserView>
          <MobileView>
          <h4 className='d-flex justify-content-center text-white align-self-center text-center mb-2' style={{fontWeight: "800"}}>Clubbing done right</h4>
          <p className='d-flex justify-content-center text-white align-self-center text-center mb-3 px-3' style={{fontWeight: "800", fontSize: "12px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>  
          </MobileView>
          <SearchBar/>
        </div>
      </div>
    </>
  )
}
