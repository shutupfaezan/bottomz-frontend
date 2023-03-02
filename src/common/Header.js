import React from "react";
import "../css/Header.css"
import SearchBar from './SearchBar';
import GlobalHeader from "./GlobalHeader";
import { BrowserView, MobileOnlyView, TabletView } from "react-device-detect";


export default function Header() {

  return (
    <>
    <GlobalHeader/>
    <BrowserView>
      <div className='svgbg' style={{height: "365px"}}></div>
      <div className='d-flex flex-column w-100 position-absolute' style={{top: "155px"}}>
        <h1 className='d-md-flex d-none justify-content-center align-self-center text-center mb-2 primary-header' style={{fontWeight: "800", fontSize: "60px", WebkitTextStroke: "0.2px white", color: "transparent"}}>Lets Make Live Happen</h1>
        <p className='d-md-flex d-none justify-content-center text-white align-self-center text-center mb-4 px-3' style={{fontWeight: "800", fontSize: "20px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p> 
        <SearchBar/>
      </div>
    </BrowserView>
    <TabletView>
      <div className='svgbg' style={{height: "365px"}}></div>
      <div className='d-flex flex-column w-100 position-absolute' style={{top: "155px"}}>
        <h1 className='d-md-flex d-none justify-content-center align-self-center text-center mb-2 primary-header' style={{fontWeight: "800", fontSize: "60px", WebkitTextStroke: "0.2px white", color: "transparent"}}>Lets Make Live Happen</h1>
        <p className='d-md-flex d-none justify-content-center text-white align-self-center text-center mb-4 px-3' style={{fontWeight: "800", fontSize: "19px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p> 
        <SearchBar/>
      </div>
    </TabletView>
    <MobileOnlyView>
      <div className='svgbg' style={{height: "429px"}}></div>
      <div className='d-flex flex-column w-100 position-absolute' style={{top: "120px"}}>
        <h4 className='d-flex d-md-none justify-content-center align-self-center text-center mb-3 primary-header px-5' style={{fontWeight: "800", fontSize: "40px", WebkitTextStroke: "0.5px white", color: "transparent"}}>Lets Make Live Happen</h4>
        <p className='d-flex d-md-none justify-content-center text-white align-self-center text-center mb-4 px-3' style={{fontWeight: "800", fontSize: "19px"}}>Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>  
        <SearchBar/>
      </div>
    </MobileOnlyView>
    </>
  )
}
