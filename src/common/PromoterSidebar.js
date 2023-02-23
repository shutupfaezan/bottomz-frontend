import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"


export default function PromoterSidebar() {
  return (
    <>
      <div className="d-flex p-0 w-100">
        <div className=" d-flex flex-column flex-shrink-0 p-3 bg-white w-100" style={{height: "100%"}}>
        <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"> 
          <span className="fs-5 fw-semibold">Bottmzup</span>
        </Link>
        <ul className="list-unstyled ps-0">
          <li className="mb-2">
            <Link className="btn d-inline-flex align-items-center rounded border-0 collapsed w-100 text-white justify-content-center" style={{background: "#800aca"}} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Host An Event
          </Link>
          </li>
          <li className="mb-2">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-target="#dashboard-collapse" aria-expanded="false">
              Events
            </button>
            <div className=" mt-2" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to="/" className="link-dark d-inline-flex text-decoration-none rounded">Ongoing Events</Link></li>
                <li><Link to="/" className="link-dark d-inline-flex text-decoration-none rounded">Event History</Link></li>
              </ul>
            </div>
          </li>
          <li className="mb-2">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-target="#orders-collapse" aria-expanded="false">
              Orders
            </button>
            <div className=" mt-2" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to="#" className="link-dark d-inline-flex text-decoration-none rounded">Ongoing Orders</Link></li>
                <li><Link to="#" className="link-dark d-inline-flex text-decoration-none rounded">Order History</Link></li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-2">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              Account
            </button>
            <div className="collapse mt-2" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to="#" className="link-dark d-inline-flex text-decoration-none rounded">Help</Link></li>
                <li><Link to="#" className="link-dark d-inline-flex text-decoration-none rounded">Sign out</Link></li>
              </ul>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </>
  )
}
