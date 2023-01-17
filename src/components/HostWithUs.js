import React from 'react'
import GlobalHeader from '../common/GlobalHeader'
import Input from '../common/Input'


export default function HostWithUs() {
  return (
    <div>
      <GlobalHeader/>
      <div className='d-lg-flex'>
      <div className='col-lg-7 pl-0 pr-3 mb-4'>
        <h2 className='mt-3 mb-4 ml-lg-3 ml-2' style={{color: "#88106f"}}>Host Your Event</h2>
        <div>
          <form>
            <div className='d-flex flex-column w-100 ml-lg-2 ml-2'><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Name:</label><Input placeholder="Eg:- Faezan Makani" style={{width: "100%"}} type="text"/></div>
            <div className='d-flex flex-column w-100 ml-lg-2 ml-2'><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Email:</label><Input placeholder="Eg:- faezanmakani13@gmail.com" style={{width: "100%"}} type="text"/></div>
            <div className='d-flex flex-column w-100 ml-lg-2 ml-2'><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Contact:</label><Input placeholder="Eg:- 810421XXXX" style={{width: "100%"}} type="text"/></div>
            <div className='d-flex flex-column w-100 ml-lg-2 ml-2'><label  className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Message:</label><textarea className="form-control ml-lg-2" style={{borderRadius: "20px", height: "100px"}} placeholder="Type something..." aria-label="With textarea"></textarea></div>
            <div className='d-flex'><button type="submit" className="btn mt-3 ml-3" style={{borderRadius: "20px", background: "#7d10bf", color: "white"}}>Submit</button></div>
          </form>
        </div>
      </div>
      <div className='col-lg-5'>
      <h2 className='mt-3 mb-lg-5 mb-3' style={{color: "#88106f"}}>Contact Us</h2>
      <div className='d-flex align-items-center mb-2'><i class="fa-solid fa-phone mr-3" style={{fontSize: "22px"}}></i><h4 className='mb-1'>9892910090</h4></div>
      <div className='d-flex align-items-center mb-2'><i class="fa-solid fa-at mr-3" style={{fontSize: "22px"}}></i><h4 className='mb-1'>bottmzupevents@gmail.com</h4></div>
      <div className='d-flex align-items-start'><i class="fa-solid fa-location-dot mr-3" style={{fontSize: "22px"}}></i><h4 className='mb-1'>The Garage, Sun Mill Compound, 210, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013</h4></div>
      
      </div>
      </div>
    </div>
  )
}
