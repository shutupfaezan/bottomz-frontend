import React from 'react'
import GlobalHeader from '../common/GlobalHeader'
import AutoHost from '../extra/AutoHost';


export default function HostWithUs() {

  return (
    <>
      <GlobalHeader/>
      <div className='d-lg-flex' style={{marginTop: "69px"}}>
        <div className='col-lg-8 pl-0 pr-0 mb-4'>
          <h3 className=' mb-4 ml-lg-3 ml-2' style={{color: "#88106f"}}>Host Your Event</h3>
          <AutoHost/>
        </div>
        <div className='col-lg-4'>
          <h3 className='mt-3 mb-lg-5 mb-3' style={{color: "#88106f"}}>Contact Us</h3>
          <div className='d-flex align-items-center mb-2'><i className="fa-solid fa-phone mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>9167250041</h5></div>
          <div className='d-flex align-items-center mb-2'><i className="fa-solid fa-at mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>bottmzupevents@gmail.com</h5></div>
          <div className='d-flex align-items-start'><i className="fa-solid fa-location-dot mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>The Garage, Sun Mill Compound, 210, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013</h5></div>
          <div className='d-flex justify-content-start mt-3 ml-4 mb-4'><img src={process.env.PUBLIC_URL + "/images/garagelocation.png"} style={{width: "70%", height: "100%", borderRadius: "10px"}} alt=""></img></div>
        </div>
      </div>
    </>
  )
}
