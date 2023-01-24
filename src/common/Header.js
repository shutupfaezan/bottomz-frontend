import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
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
      <div className="d-flex align-items-center" style={{background: `url('${process.env.PUBLIC_URL}/images/purplecanvas.jpeg') no-repeat center/cover`, height: "300px" }}>
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
          </ul>
          <div className="btn-group dropleft ml-auto ml-md-0">
          <i className="bi bi-person-circle pt-2" onClick={modalswitch} style={{fontSize: "25px", cursor: "pointer"}}></i>
          {/* <p className="m-0 px-3 mt-1 py-1" style={{border: "1px solid white", borderRadius: "10px", cursor: "pointer"}}  onClick={modalswitch}>Sign Up</p> */}
          <CommonModal show={show}/>  
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
