import React, { useState } from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../css/Header.css"
import CommonModal from './CommonModal'


export default function GlobalHeader() {
    const navigate = useNavigate()
    const [showDropBox, setShowDropBox] = useState(false)
    function modalswitch(){
      if(localStorage.token && !showDropBox){
        setShowDropBox(true)
      }
      else if(localStorage.token && showDropBox){
        setShowDropBox(false)
      }
      else{
        setShow(true)
      }
    }
const {setShow,show} = useContext(SingularContext);
  return (
    <>
        <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100" style={{background: "#361532", color: "white"}}>
        <a className="navbar-brand text-white" style={{fontWeight: "800"}} href="/">BottmzUp.com</a>
        <div className="collapse navbar-collapse text-black" id="navbarSupportedContent">
            <ul className="navbar-nav ml-md-auto mr-3">
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
            <i className="bi bi-search ml-auto ml-md-0 mr-4 mt-2" style={{fontSize: "20px"}}></i>
            <div className="btn-group dropleft ml-md-0">
            <i className="bi bi-person-circle pt-2" onClick={modalswitch} style={{fontSize: "25px"}}></i>
            <CommonModal show={show}/>
            {showDropBox && <ul className="dropdown-menu show ">
                <li><a className="dropdown-item" href="/">Favourites</a></li>
                <li><Link className="dropdown-item" style={{color: "red"}} onClick={()=>{localStorage.clear(); navigate("/"); window.location.reload()}}>Log Out</Link></li>
            </ul>}
         </div>
        </div>
        </nav>
    </>
  )
}
