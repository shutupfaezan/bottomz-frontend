import axios from 'axios';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function OrderTicketModal(props) {
  
  function changeStatus() {
    axios.put(`https://nightlife-2710.herokuapp.com/update-order-status?order_id=${props?.displayOrders?.Order_ID}`);
  }

  const isPaid = props?.displayOrders?.status?.[0] === 'Paid';

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 p-5'>
          <b style={{fontWeight: "800", fontSize: "20px"}} > Order Id: {props?.displayOrders?.Order_ID}</b>
          <div className='d-flex'>
            <span className="ml-auto" style={{marginRight: "5px", fontWeight: "100"}}>Status:</span>
            <span style={{color: isPaid ? "#49cc90" : "#b10808"}}>
              {props?.displayOrders?.status?.[0]}
            </span>
          </div>
          <span className='d-flex flex-column mb-4 mt-3'>
            {props?.displayOrders?.Ticket_Category && props?.displayOrders?.Quantity && props?.displayOrders?.Description && props?.displayOrders?.Cover_Description && props?.displayOrders?.Price && props?.displayOrders?.Ticket_Category.map((ticket, index) => (
              <div className='w-100' key={index}>
                <div className='d-flex mt-2'>
                  <div>
                    <p className='m-0'>{ticket}</p>
                    <p className='m-0' style={{color: "gray", fontSize: "14px"}}>
                      {props?.displayOrders?.Description[index]} | {props?.displayOrders?.Cover_Description[index]}
                    </p>
                  </div>
                  <div className='ml-auto'>
                    <p className='m-0'>₹{props?.displayOrders?.Price[index]}</p>
                    <p style={{fontSize: "13px", color: "gray"}}>Oty: {props?.displayOrders?.Quantity[index]}</p>
                  </div>
                </div>  
              </div>
            ))}
          </span>
          <div className='d-flex'>
            <button
              className='w-100 col-7 col-md-5 btn mx-auto'
              onClick={changeStatus}
              style={{
                color: isPaid ? 'black' : '#49cc90',
                background: isPaid ? '#d8d8d8' : '#ecfaf4',
                border: isPaid ? '2px solid black': '2px solid #49cc90',
                borderRadius: "10px"
              }}
              disabled={isPaid}
            >
              <i className="bi bi-check2 mr-1" style={{fontSize: "18px"}}></i>
              {isPaid ? 'Already Paid' : 'Change to Paid'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
