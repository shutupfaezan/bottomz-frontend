import React from 'react'
import Input from '../../common/Input'

export default function Newsletter() {
  return (
    <section className='d-md-flex justify-content-center align-items-center py-5 px-auto container-xl' style={{borderRadius: "20px"}}>
      <div className='col-md-11 col px-md-5 py-5 d-flex flex-column text-center' style={{border: "2px solid black", borderRadius: "10px", boxShadow: "7px 7px rgb(205 207 209)"}}>
        <div className='ml-2 primary-header flex-wrap d-flex justify-content-center'><h1 className='primary-header mr-2'>Subscribe</h1><h1 style={{color: "transparent", WebkitTextStroke: "0.5px black"}} className='primary-header'>Newsletter</h1></div>
        <div className='d-flex flex-column justify-content-center'>
          <small className='m-0' style={{color: "#57577a", fontSize: "16px"}}>Nightlife Explore</small>
          <small className='my-md-2 my-3 ml-2' style={{color: "#57577a"}}>Get notifications of events in your area and exclusive discount codes</small>
          <div className='d-flex w-75 my-2 mx-auto flex-column flex-md-row justify-content-center'><Input style={{width: "100%"}} placeholder="Enter Email to Subscribe"></Input><button className='col-md col-6 mx-auto mx-md-2 btn btn-primary ml-2' style={{height: "40px", borderRadius: "40px", padding: "5px 20px", background: "black"}}>Subscribe</button></div>
        </div>
      </div>  
    </section>
  )
}
