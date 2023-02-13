import React from 'react'
import Input from '../../common/Input'

export default function Newsletter() {
  return (
    <div className='d-md-flex p-4 mx-3 mx-md-5' style={{borderRadius: "20px", height: "275px", background: "#459fc6"}}>
      <div className='col-md-7 p-0 d-flex flex-column'>
        <div className='ml-2'><strong><h4>Subscribe</h4></strong><strong><h4> Newsletter</h4></strong></div>
        <div className='mt-auto'>
          <p className='m-0 mt-2 text-white ml-2' style={{fontSize: "20px", color: "#57577a"}}>Nightlife Explore</p>
          <p className='my-1 text-white ml-2' style={{fontSize: "16px", color: "#57577a"}}>Get notifications of events in your area and exclusive discount codes</p>
          <div className='d-flex w-100 mt-2'><Input placeholder="Enter Email to Subscribe" style={{width: "72%", marginRight: "10px"}}></Input><button className='btn btn-primary' style={{height: "40px", borderRadius: "40px", padding: "5px 20px", background: "black"}}>Submit</button></div>
        </div>
      </div>
      <div className='col-md-5 p-0 d-md-flex d-none justify-content-center'>
        <img src={process.env.PUBLIC_URL + "/images/open-mailbox-with-lowered-flag.svg"} alt=""></img>
      </div>
    </div>
  )
}
