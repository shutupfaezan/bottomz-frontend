import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
// import AutoHost from '../../extra/AutoHost';


export default function HostWithUs() {

  return (
    <>
      <GlobalHeader/>
      <div className='d-lg-flex'>
        <div className='col-lg-8 mb-4 mt-4'>
        <h3 className='mt-3 mb-lg-5 mb-3' style={{color: "#88106f"}}>Query Form</h3>
        <div className="input-group mb-3 pr-0 pl-0 col-11 col-md-5 col-lg-4 d-flex flex-column w-100">
        <label className='ml-2 mb-1'>Query:</label>
            <select className="form-select w-100" >
                <option defaultValue>Select a Query</option>
                <option value="1">Be a Promoter</option>  
                <option value="2">Ticket Query</option>
                <option value="3">Feedback</option>
                <option value="4">Others</option>
            </select>
            </div>
        <div className="input-group mb-3 pr-0 w-100">
            <div className='d-flex flex-column w-100'>
                <label className='ml-2 mb-1'>Email:</label>
                <input className="form-control w-100" name="event_name" placeholder="Enter Event Name"></input>
            </div>    
          </div>
        <div className="input-group mb-3 pr-0 w-100">
            <div className='d-flex flex-column w-100'>
                <label className='ml-2 mb-1'>Message:</label>
                <textarea className="form-control w-100" name="date" placeholder='Enter your message' type="text"></textarea>
            </div>
        </div>
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
