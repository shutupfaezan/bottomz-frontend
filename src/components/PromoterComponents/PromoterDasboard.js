import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PromoterSidebar from "../../common/PromoterSidebar"

export default function PromoterDasboard() {
  const navigate = useNavigate()
  return (
      <>
      <div className='d-md-flex vh-100'>
        <div className='col-md-3 p-0'>
          <PromoterSidebar/>
        </div>
        <div className='col-md-9 p-0 d-flex flex-column justify-content-center align-items-center text-center'>
          <h4>Haven't hosted an event yet? Don't worry we got you</h4>
          <Link onClick={()=>navigate('/host-an-event')} className="btn d-inline-flex align-items-center rounded border-0 collapsed text-white justify-content-center" style={{background: "#800aca", width: "35%" }} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Host An Event
          </Link>
        </div>
      </div>
      </>
  )
}
