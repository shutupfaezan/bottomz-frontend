import React from 'react'
import axios from "axios"
import { useState } from 'react';
import OrderTicketModal from '../common/OrderTicketModal';

export default function SearchBar(props) {
    const [show, setShow] = useState(false)
  const [displayOrders, setDisplayOrders] = useState();
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`https://nightlife-2710.herokuapp.com/promoter-modal-values?order_id=${searchQuery}`)
    .then((response)=>{
      setShow(true)
      setDisplayOrders(response?.data)
    })
  }
  const handleClose = () => setShow(false);
  return (
    <>
      <div className='w-100 d-flex justify-content-center'>
        <form className=" d-inline-block align-items-center position-relative col-11 p-0" role="search">
          <input className="form-control w-100" type="search" style={{height: "62px", borderRadius: "25px", fontWeight: "800", color: "black", padding: "10px 110px 10px 10px", border: "2px solid black"}} placeholder="Enter Order ID" onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search"/>
          <button className="btn btn-dark col-lg-2 col-md-3 col-4 position-absolute mt-2 mr-1" style={{top: "0px", right: "3px", padding: "10px 25px", background: "black", borderRadius: "20px"}} onClick={handleSearch}>Search</button>
        </form> 
      </div>
      <OrderTicketModal show={show} displayOrders={displayOrders} handleClose={handleClose} orders={props.orders}/>
    </>
  )
}
