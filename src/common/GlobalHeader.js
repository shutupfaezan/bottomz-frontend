import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { Link } from "react-router-dom"
import "../css/Header.css"
import CommonModal from './CommonModal'
import Hamburger from '../extra/Hamburger';


export default function GlobalHeader() {

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
        <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100" style={{background: "#276f93"}}>
        <Hamburger/>
        <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp</a>
        <div className="collapse navbar-collapse text-black" id="navbarSupportedContent">
            <ul className="navbar-nav ml-md-auto mr-3">
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
            <div className="btn-group dropleft ml-md-0 ml-auto">
          <p className="m-0 px-3 mt-1 py-1 text-white" style={{border: "1px solid white", borderRadius: "10px", cursor: "pointer"}}  onClick={modalswitch}>Sign Up</p>
            <CommonModal show={show}/>
         </div>
        </div>
        </nav>
    </>
  )
}
