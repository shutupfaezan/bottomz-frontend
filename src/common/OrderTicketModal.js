import axios from 'axios';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function OrderTicketModal(props) {
  
  function changeStatus() {
    axios.put(`https://nightlife-2710.herokuapp.com/update-order-status?order_id=${props?.displayOrders?.Order_ID}`)
      .then(() => {
        props.handleClose();
        // window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
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
           {props?.displayOrders?.status?.[0] === "Unpaid" && <div className='d-flex justify-content-end'>
            <i className="fa-solid fa-check mr-1 bg-success text-white px-2 py-2" onClick={changeStatus} style={{fontSize: "24px", borderRadius: "10px"}}></i>
            <i className="fa-solid fa-xmark mr-1 bg-danger text-white px-2 py-2" onClick={()=>{props.handleClose();}} style={{fontSize: "24px", borderRadius: "10px"}}></i>
          </div>}
        </div>
      </div>
    </Modal>
  );
}
