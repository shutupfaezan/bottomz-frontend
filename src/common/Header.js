import React from "react";
import "../css/Header.css"
// import SearchBar from './SearchBar';
import GlobalHeader from "./GlobalHeader";


export default function Header() {

  return (
    <>
    <GlobalHeader/>
    <div className="position-relative">
      <div className='svgbg' style={{height: "570px"}}></div>
      <div className='d-flex flex-column w-100 position-absolute' style={{top: "50%", left: "50%", transform: " translate(-50%, -50%)"}}>
        <h1 className='d-flex justify-content-center align-self-center text-center mb-2 primary-header' style={{fontWeight: "800", fontSize: "60px", color: "white"}}>Lets Make Live Happen</h1>
        <p className='d-flex justify-content-center text-white align-self-center text-center mb-4 px-3' style={{fontWeight: "800", fontSize: "20px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p> 
      </div>
      </div>
    </>
  )
}
