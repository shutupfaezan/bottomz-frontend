  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import GlobalHeader from "../../common/GlobalHeader";
  import Footer from "../../common/Footer";
  import { format } from 'date-fns';

  export default function TicketOutput() {
    const [eventDetails, setEventDetails] = useState();
    const [qrCode, setQrCode] = useState();
    const [isLoading, setisLoading] = useState(false)
    const [mainLoading, setMainLoading] = useState(false)
    
    const [orderDetails, setOrderDetails] = useState();
    const user_tickets = async () => {
      setMainLoading(true)
      return await axios.get(
        `https://nightlife-2710.herokuapp.com/user-tickets?order_id=${sessionStorage.order_id}&access_token=${sessionStorage.token}`
        );
      };
      
      useEffect(() => {
        user_tickets()
        .then((response) => {
          setMainLoading(false)
          setQrCode(response?.data?.QR?.[0])
          setEventDetails(response?.data?.Event_details?.[0]);
          setOrderDetails(response?.data?.order_details)
        })
        .catch((error) => {
          console.log(error);
        });
        //eslint-disable-next-line
      }, []);
      
      function ResendAPi(){
        setisLoading(true)
        axios.post(`https://nightlife-2710.herokuapp.com/resend-confirmation?order_id=${orderDetails?.[0]?.order_id}&event_name=${eventDetails?.event_name}&access_token=${sessionStorage.token}`)
        .then((response)=>{
          setisLoading(false)
        })
        
      }
      const bookingDate = orderDetails?.[0]?.created_at ? format(new Date(orderDetails?.[0]?.created_at), 'dd MMMM yyyy') : '';
      const totalQuantity = orderDetails?.reduce((acc, item) => acc + item?.quantity, 0);
      const totalPrice = orderDetails?.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
      
      const formatDate = (dateStr) => {
      if (!dateStr) return "";
    
      const [year, month, day] = dateStr.split("-");
      const date = new Date(year, month - 1, day);
      const options = { day: 'numeric', month: 'short' };
      return date.toLocaleDateString('en-US', options);
    }
    


    return (
      <div>
        {
          mainLoading && <div className='d-flex justify-content-center mt-auto'>
          <div className='d-flex align-items-center'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
          </div>
          </div>
        }
        {!mainLoading && <><GlobalHeader />
        <div className='mb-5 mb-2 mb-md-3 py-5' style={{ background: "black"}}>
          <div className='d-flex justify-content-center align-items-center flex-column px-md-5 px-2 mx-lg-4 mx-md-2' style={{height: "100%"}}>
            <div className='primary-header ml-2 text-white text-center' style={{fontSize: "40px"}}>Thank You For Your Order</div>
            <div className='primary-header ml-2 text-white text-center' style={{fontSize: "40px"}}>{eventDetails?.event_name}</div>
          </div>
        </div>
        <div className="px-lg-5 px-md-3">
          <div className="p-lg-5 py-md-4 d-flex flex-column flex-md-row p-4">
            <div className="col-md-8 d-flex py-3 flex-md-row flex-column " style={{border: "2px solid black", borderRadius: "10px", boxShadow: "10px 10px #E8EBEE"}}>
              <div className="ticketImage col-md-4 p-0">
              <div style={{background: `url(${eventDetails?.images_url}) no-repeat center/cover`, height: "100%", width: "100%", filter: "blur(3px)", borderRadius: "10px"}}></div>
                <img style={{position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)", height: "100%", maxWidth: "100%", borderRadius: "10px"}} src={eventDetails?.images_url} alt=""/>
              </div>
              <div className="col-md-8 mt-3 mt-md-0">
                <p className="mb-2" style={{fontSize: "20px"}}>{eventDetails?.event_name}</p>
                <b style={{display: "block", marginBottom: "5px"}}><i className="fa-regular fa-calendar mr-2"></i>{eventDetails?.timings} • {formatDate(eventDetails?.date)}</b>
                <b style={{display: "block", marginBottom: "5px"}}><i className="fa-regular fa-circle-user mr-2"></i>{eventDetails?.curated_by}</b>
                <b style={{display: "block", marginBottom: "5px"}}>Quantity: {totalQuantity} Person(s)</b>
                <b style={{display: "block", marginBottom: "5px"}}>Amount To Be Paid: {totalPrice} INR</b>
                <b style={{display: "flex", marginBottom: "5px"}}><b>Categries: </b>
                <div className="d-flex flex-column flex-md-row">
                {orderDetails && orderDetails?.map((object, index)=>{
                  return(
                    <small className="mb-0 ml-2">{object?.ticket_category} x <span style={{color: "crimson"}}>Oty : {object?.quantity}</span></small>
                  )
                })}
                </div>
                </b>
              </div>
            </div>
            <div className="col-md-4 py-4 text-white d-flex" style={{background: "black", borderRadius: "10px", boxShadow: "10px 10px #E8EBEE", overflow: "hidden"}}>
              <img src={qrCode} className="mx-auto" style={{width: "200px", borderRadius: "10px", aspectRatio: "1/1"}} alt=""></img>
              {/* <b>Tickets will be sent on your registered email (abc@gmail.com) shortly.</b> */}
              {/* <p className="pt-3 text-center" style={{fontSize: "24px", transform: "rotate(270deg)"}}>{orderDetails?.[0]?.order_id}</p> */}
            </div>
          </div>
            <p className="px-lg-5 p-3">*Please check promotions/spams as mails may be wrongly flagged at times</p>
            <p className="px-lg-5 p-3">For queries, reach out us on <a href="/gmail.com" style={{color: "crimson"}}>info@bottmzup.com</a></p>
            <div className="px-lg-5 p-3 mt-4">
              <button className="btn px-3 py-md-2 py-3 mr-lg-3 mr-md-2 rounded-pill col-lg-3 col-md-4 col text-white mb-3" style={{background: "black"}}><i className="fa-solid fa-ticket mr-2"></i>View Order Details</button>
              <button className="btn px-2 py-md-2 py-3 mr-lg-3 rounded-pill mt-md-0 mt-3 mr-md-2 col-lg-3 col-md-4 col mb-3" style={{background: "white", border: "2px solid black", color: "black"}} onClick={ResendAPi}>
                {!isLoading && (<span><i className="fa-solid fa-rotate-right mr-2"></i>Resend Confirmation</span>)}
                {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                </button>
              {/* <button className="btn px-3 py-md-2 py-3 mr-lg-3 mt-3 mt-md-0 rounded-pill col-lg-3 col-md-4 col mb-3" style={{background: "white", border: "2px solid black", color: "black"}}><i className="fa-solid fa-print mr-2"></i>Print Booking Info
              </button> */}
            </div>
            <p className="px-lg-5 mt-4 mb-5 p-3">Booking Date & Time <span style={{color: "crimson"}}>{bookingDate}</span></p>
        </div>
        <Footer/></>}
      </div>
    );
  }
