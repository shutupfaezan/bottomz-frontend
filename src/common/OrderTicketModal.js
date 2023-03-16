import React from 'react';
import axios from "axios"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function OrderTicketModal(props) {
  const [displayOrders, setDisplayOrders] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`https://nightlife-2710.herokuapp.com/promoter-modal-values?order_id=${searchQuery}`)
    .then((response)=>{
      setDisplayOrders(response?.data)
    })
  }
  
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <div className='d-flex flex-column align-items-center justify-content-center my-5'>
        <div className='w-100 d-flex justify-content-center'>
          <form className="d-inline-block align-items-center position-relative" style={{width: "75%"}} onSubmit={handleSearch} role="search">
            <input className="form-control w-100" type="search" style={{height: "62px", borderRadius: "25px", fontWeight: "800", color: "black", padding: "10px 110px 10px 10px", border: "2px solid black"}} placeholder="Enter Order ID" onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search"/>
            <button className="btn btn-dark col-lg-3 col-md-3 col-4 position-absolute mt-2 mr-1" style={{top: "0px", right: "3px", padding: "10px 25px", background: "black", borderRadius: "20px"}} onClick={handleSearch}>Search</button>
          </form>
        </div>
        <div className='w-100 p-5'>
          <b style={{fontWeight: "800", fontSize: "20px"}} > Order Id: {displayOrders?.Order_ID}</b>
          <span className='d-flex flex-column mt-3'>
            {displayOrders?.Ticket_Category && displayOrders?.Quantity && displayOrders?.Description && displayOrders?.Cover_Description && displayOrders?.Price && displayOrders?.Ticket_Category.map((ticket, index) => (
              <div className='w-100' key={index}>
                <div className='d-flex mt-2'>
                  <div>
                    <p className='m-0'>{ticket}</p>
                    <p className='m-0' style={{color: "gray", fontSize: "14px"}}>{displayOrders?.Description[index]} | {displayOrders?.Cover_Description[index]}</p>
                </div>
                <div className='ml-auto'>
                <p className='m-0'>₹{displayOrders?.Price[index]}</p>
                <p style={{fontSize: "13px", color: "gray"}}>Oty: {displayOrders?.Quantity[index]}</p>
                </div>
                </div>  
              </div>
            ))}
          </span>
        </div>
      </div>
    </Modal>
  );
}
