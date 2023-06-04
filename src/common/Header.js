import React from "react";
import "../css/Header.css"
// import SearchBar from './SearchBar';
import GlobalHeader from "./GlobalHeader";


export default function Header() {

  return (
    <>
    <GlobalHeader/>
    <div className="position-relative mb-lg-5">
      <div className='svgbg MainHeader' style={{height: "93vh", clipPath: "polygon(0 0, 100% 0, 100% 87%, 0% 100%)"}}></div>
      <div className='d-flex flex-column w-50 position-absolute ml-lg-5 pl-lg-5' style={{top: "50%", left: "0%", transform: " translateY(-50%)"}}>
        <h1 className='d-flex justify-content-center align-self-center mb-4 MainHeaderText primary-header' style={{fontWeight: "400", fontSize: "96px", color: "white", textAlign: 'left', lineHeight: '94%'}}>Lets Make Live Happen</h1>
        <p className='d-flex justify-content-center text-white align-self-center pr-5' style={{fontWeight: "400", fontFamily: 'Dm Sans', fontSize: "24px", lineHeight:"144%"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p> 
      </div>
      </div>
    </>
  )
}
