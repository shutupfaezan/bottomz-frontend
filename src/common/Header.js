import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { Link } from "react-router-dom"
import "../css/Header.css"
import CommonModal from './CommonModal'
import { useState } from 'react';
import SearchBar from './SearchBar';


export default function Header() {
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
      <div className="d-flex align-items-center" style={{background: `url('${process.env.PUBLIC_URL}/images/sarah-kilian-7BQzWIQOv9E-unsplash.jpg') no-repeat center/cover`, height: "300px" }}>
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
              <Link className="nav-link pb-0 text-white" style={{fontSize: "19px"}} to="/host-with-us">Host With Us</Link>
            </li>
          </ul>
          <div className="btn-group dropleft ml-auto ml-md-0">
          <i className="bi bi-person-circle pt-2" onClick={modalswitch} style={{fontSize: "25px"}}></i>
        <CommonModal show={show}/>
        {showDropBox && <ul className="dropdown-menu show ">
          <li><Link className="dropdown-item" to="/">Favourites</Link></li>
          <li><Link className="dropdown-item" to="/host-with-us">Host with us</Link></li>
          <li><Link className="dropdown-item" style={{color: "red"}} onClick={()=>{localStorage.clear(); window.location.reload()}}>Log Out</Link></li>
         </ul>}
         </div>
        </div>
        </nav>
        <div className='d-flex flex-column w-100'>
          <h3 className='d-flex justify-content-center text-white align-self-center text-center' style={{fontWeight: "800"}}>Experiences of a Lifetime</h3>  
          <SearchBar/>
        </div>
      </div>
    </>
  )
}
