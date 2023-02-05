import React from "react";
import "../css/Header.css"
import SearchBar from './SearchBar';
import GlobalHeader from "./GlobalHeader";


export default function Header() {

  return (
    <>
      <div className='svgbg'  style={{height: "300px", boxShadow: "1px 1px 10px grey"}}></div>
      <GlobalHeader/>
      <div className='d-flex flex-column w-100 position-absolute' style={{top: "105px"}}>
        <h2 className='d-md-flex d-none justify-content-center text-white align-self-center text-center mb-2' style={{fontWeight: "800"}}>Clubbing done right</h2>
        <p className='d-md-flex d-none justify-content-center text-white align-self-center text-center mb-4' style={{fontWeight: "800", fontSize: "20px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>  
        <h4 className='d-flex d-md-none justify-content-center text-white align-self-center text-center mb-2' style={{fontWeight: "800"}}>Clubbing done right</h4>
        <p className='d-flex d-md-none justify-content-center text-white align-self-center text-center mb-3 px-3' style={{fontWeight: "800", fontSize: "12px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>  
        <SearchBar/>
      </div>
    </>
  )
}
