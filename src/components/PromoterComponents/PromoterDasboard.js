import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PromoterSidebar from "../../common/PromoterSidebar"
import Footer from "../../common/Footer"

export default function PromoterDasboard() {
  const navigate = useNavigate()
  return (
      <>
      <div>
      <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
        <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
      <div className='d-lg-flex px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
        <div className='col-lg-9 p-0 d-flex flex-column align-items-center mt-5 mt-lg-0 justify-content-center align-items-center text-center'>
          <h6 className='p-0 p-3' style={{fontWeight: "700"}}>Haven't hosted an event yet? Don't worry we got you</h6>
          <Link onClick={()=>navigate('/host-an-event')} className="btn d-inline-flex align-items-center border-0 px-5 collapsed text-white justify-content-center" style={{background: "black", borderRadius: "25px" }} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Host An Event
          </Link>
        </div>
      </div>
        <Footer/>
      </div>
      </>
  )
}
