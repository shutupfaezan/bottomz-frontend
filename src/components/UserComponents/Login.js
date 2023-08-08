import React from 'react'

export default function Login() {
  return (
    <div className='d-flex w-100' style={{backgroundColor: "#0B0B0B", color: "white"}}>
      <div className='col-lg-6 pl-4 pr-0 py-4'>
        <div className='position-relative'>
          <img src={process.env.PUBLIC_URL + "/images/new-signup.png"} style={{width: "100%", height: "100%"}}></img>
          <img src={process.env.PUBLIC_URL + "/images/LOGO.svg"} className="col-lg-4" style={{position: "absolute", left: "15px", top: "25px"}}></img>
          <div style={{border: "2px solid white", position: "absolute", bottom: "0"}}>huhuhh</div>
        </div>
      </div>
      <div className='col-lg-6 pl-4 pr-0 py-4'>hi</div>
    </div>
  )
}
