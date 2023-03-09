import React from 'react'
import { Link } from 'react-router-dom'

export default function PromoterLogin() {
  return (
    <div className='d-lg-flex vh-100'>
      <div className='col-lg-6 px-0' style={{background: "#F5F5F5"}}>
        <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 pt-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "transparent"}}>
        <a className="navbar-brand ml-lg-5 ml-2 mb-3 py-3 py-md-1" style={{fontWeight: "800", color: "black"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
        <div className=''>
        <div className="align-items-center headerback w-100 py-2 py-md-2 px-3 px-lg-5 px-md-3">
        <h1 className="ml-lg-5 ml-2 py-3 mb-0 py-md-1 primary-header" style={{color: "transparent", WebkitTextStroke: "1px black"}}>Promoter/Club</h1>
        <h1 className="ml-lg-5 ml-2 primary-header mb-0" style={{color: "black"}}>Log In</h1>
        </div>
        <div className="align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3">
          <div className='col-lg-8 p-0 ml-lg-5 mb-2 ml-2 py-3 mb-0 py-md-1 d-flex flex-column'>
          <label className='mb-1' style={{fontSize: "14px"}}>Email:</label>
          <input className="p-2" name="featuring" style={{border: "2px solid black", borderRadius: "10px"}}></input>
          </div>
          <div className='col-lg-8 p-0 ml-lg-5 mb-2 ml-2 py-3 mb-0 py-md-1 d-flex flex-column'>
          <label className='mb-1' style={{fontSize: "14px"}}>Password:</label>
          <input className="p-2" name="featuring" style={{border: "2px solid black", borderRadius: "10px"}}></input>
          </div>
          <div className='col-8 p-0 ml-lg-5 mb-2 ml-2 py-3 mb-0 py-md-1 d-flex flex-column'>
          <button className='btn mt-2 p-2 text-white' style={{background: "black"}}>Log In</button>
          </div>
        </div>
      <div className='d-flex justify-content-center mr-4'>
        <Link className='mr-5'>Not a promoter? Be one now</Link>
        </div>
        </div>
        </div>
      <div className='col-lg-6 promoter-pic'>
      </div>
    </div>
  )
}
