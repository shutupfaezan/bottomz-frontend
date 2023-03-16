import React from 'react'
import OrderTicketModal from '../common/OrderTicketModal';

export default function SearchBar(props) {

  return (
    <>
      <div className='w-100 d-flex justify-content-center'>
        <form className=" d-inline-block align-items-center position-relative" style={{width: "75%"}} role="search">
          <input className="form-control w-100" type="search" style={{height: "62px", borderRadius: "25px", fontWeight: "800", color: "black", padding: "10px 110px 10px 10px", border: "2px solid black"}} placeholder="Enter Order ID" onClick={props.onClick} aria-label="Search"/>
          <button className="btn btn-dark col-lg-2 col-md-3 col-4 position-absolute mt-2 mr-1" style={{top: "0px", right: "3px", padding: "10px 25px", background: "black", borderRadius: "20px"}}>Search</button>
        </form> 
      </div>
      <OrderTicketModal show={props.show} handleClose={props.handleClose} orders={props.orders}/>
    </>
  )
}
