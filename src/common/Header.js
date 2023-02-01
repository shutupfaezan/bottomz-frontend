import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { BrowserView, MobileView} from 'react-device-detect' 
import { Link } from "react-router-dom"
import "../css/Header.css"
import CommonModal from './CommonModal'
import SearchBar from './SearchBar';
import Hamburger from '../extra/Hamburger';


export default function Header() {
const {setShow,show} = useContext(SingularContext);
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
    <div className='svgbg'  style={{height: "300px", boxShadow: "1px 1px 10px grey"}}></div>
      <div className="d-flex align-items-center">
        <nav className="navbar navbar-expand navbar-light align-items-center headerback position-absolute w-100" style={{top: "0px"}}>
          <Hamburger/>
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
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/host-with-us">Host With Us</Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/host-with-us">Help</Link>
            </li>
          </ul>
          <div className="btn-group dropleft ml-auto ml-md-0">
          {/* <i className="bi bi-person-circle pt-2" onClick={modalswitch} style={{fontSize: "25px", cursor: "pointer"}}></i>   */}
          <p className="m-0 px-3 mt-1 py-1" style={{border: "1px solid white", borderRadius: "10px", cursor: "pointer"}}  onClick={modalswitch}>Sign Up</p>
          <CommonModal show={show}/>  
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
