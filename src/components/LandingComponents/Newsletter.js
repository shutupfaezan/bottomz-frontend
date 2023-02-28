import React from 'react'
import Input from '../../common/Input'

export default function Newsletter() {
  return (
    <div className='d-md-flex justify-content-center align-items-center p-4 mx-3 mx-md-5' style={{borderRadius: "20px", height: "275px", background: "#459fc6"}}>
      <div className='col-md-7 p-0 d-flex flex-column text-center'>
        <div className='ml-2'><h2>Subscribe Newsletter</h2></div>
        <div className=''>
          <p className='m-0 text-white' style={{fontSize: "23px", color: "#57577a"}}>Nightlife Explore</p>
          <p className='my-md-2 my-3 text-white ml-2' style={{fontSize: "16px", color: "#57577a"}}>Get notifications of events in your area and exclusive discount codes</p>
          <div className='d-flex w-100 mt-2'><Input placeholder="Enter Email to Subscribe" style={{width: "72%", marginRight: "10px"}}></Input><button className='btn btn-primary' style={{height: "40px", borderRadius: "40px", padding: "5px 20px", background: "black"}}>Submit</button></div>
        </div>
      </div>  
    </div>
  )
}
