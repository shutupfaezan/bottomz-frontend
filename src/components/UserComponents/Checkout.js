  import axios from 'axios'
  import React from 'react'
  import { useNavigate } from 'react-router-dom';
  import GlobalHeader from '../../common/GlobalHeader'
  import { useState } from 'react';
  import { useEffect } from 'react'
  import { useParams } from "react-router-dom";
  import "react-tooltip/dist/react-tooltip.css";
  import { Tooltip as ReactTooltip } from "react-tooltip";
  import Footer from "../../common/Footer"  
  // import {SingularContext} from '../../contexts/Context';
  
  
  export default function Checkout() {
    // const {setOrderId} = useContext(SingularContext);
    const [updatedCheckoutInfo, setUpdatedCheckoutInfo] = useState()
    const savedCheckoutInfo = JSON.parse(sessionStorage.getItem('checkoutData'));
    const [billInfo] = useState(savedCheckoutInfo?.order_details);
    const [attendeeInfo] = useState(savedCheckoutInfo?.attendeeValue);
    const [eventInfo, setEventInfo] = useState()
    const [isLoading, setisLoading] = useState(false);
      const params = useParams()
      const bill = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params?.event_name}`)}
      useEffect(() => {
        bill().then((response) => {
          setEventInfo(response?.data?.event_data);
          const newCheckout = {
            ...savedCheckoutInfo,
            request: {
              "event_name": response?.data?.event_data?.event_name,
              "event_venue": response?.data?.event_data?.event_venue,
              "timings": response?.data?.event_data?.timings,
              "date": response?.data?.event_data?.date,
              "images_url": response?.data?.event_data?.images_url
            }
          };
          setUpdatedCheckoutInfo(newCheckout)
        })
        .catch((error) => {
          console.log(error);
        });
        // eslint-disable-next-line
      }, [])

      const date = new Date(eventInfo?.date);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.toLocaleString('default', { year: 'numeric' });
      const formattedDate = `${day} ${month} ${year}`;
      const navigate = useNavigate()
      let sum = 0
      for (var i = 0; i < billInfo?.length; i++) {
        sum += parseInt(billInfo?.[i]?.total_price);
      }

      // const paymentObj ={
      //   access_token: sessionStorage?.token,
      //   purpose: eventInfo?.event_name,
      //   amount: sum
      // }
    // function paymentsCreate(){
    //   axios.post(`https://nightlife-2710.herokuapp.com/payments/create`, paymentObj)
    //   .then((response)=>{
    //     window.location.href = response?.data?.[0];
    //   })
    // }




    function CreateOrder(){
      setisLoading(true)
      axios.post(`https://nightlife-2710.herokuapp.com/orders?event_name=${params?.event_name}&access_token=${sessionStorage.token}`, updatedCheckoutInfo)
      .then((response)=>{
        setisLoading(false)
        sessionStorage.setItem('order_id', response?.data)
        navigate(`/all-events/${params.event_name}/confirmation`)
      })
      .catch((error)=>{
        setisLoading(false)
        console.log(error)
      })
    }
    return (
      <div>
        <GlobalHeader/>
        <div className='mb-5 mb-2 mb-md-3' style={{height: "200px", background: "black"}}>
        <div className='d-flex justify-content-center align-items-center flex-md-row flex-column px-5 mx-lg-4 mx-md-2' style={{height: "100%"}}>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>Check</div>
          <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Out</div>
        </div>
        </div>
              <h1 className='primary-header px-lg-5 mx-3 my-md-4 my-5 mpt-lg-5'>Choose your mode of payment</h1>
        <div className="px-lg-5 py-lg-3 mx-md-3 mx-lg-0 d-flex flex-column flex-lg-row">
          <div className='col-lg-7 mb-5 mb-lg-0 order-2 order-lg-0 mr-auto'>
            <div className=' mt-lg-0'>
              <div>
                <div className="form-check d-flex align-items-center py-3 p-md-3 mb-4"  style={{border: "2px solid black", borderRadius: "10px", boxShadow: "7px 7px #E8EBEE"}}>
                  <input className="form-check-input mr-4 align-self-center my-1" style={{border: "5px solid gray"}} type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={true}/>
                  <div className='d-flex flex-column'>
                  <label className="form-check-label mb-2" htmlFor="flexRadioDefault1">
                      Pay at Venue
                  </label>
                  <p  className="mb-1" style={{fontWeight: "100", fontSize: "14px"}}>Usually used for larger amounts and table bookings</p>
                  </div>
                </div>
                <div className="form-check d-flex align-items-center py-3 p-md-3" id="payNow" style={{border: "2px solid black", borderRadius: "10px", boxShadow: "7px 7px #E8EBEE"}}>
                  <input className="form-check-input mr-4 align-self-center my-1" style={{border: "5px solid gray"}} type="radio" name="flexRadioDefault" id="flexRadioDefault1" disabled={true} data-toggle="tooltip" title="Pay at club"/>
                  <div className='d-flex flex-column'>
                  <label className="form-check-label mb-2" htmlFor="flexRadioDefault1">
                      Pay now
                  </label>
                  <p  className="mb-1"  style={{fontWeight: "100", fontSize: "14px"}}>If its a small amount, might as well just pay now and be reserved.</p>
                  </div>
                </div>
                <ReactTooltip
                  anchorId="payNow"
                  place="bottom"
                  content="Pay Now is not available for this event"
                />
                <p className="ml-2 mt-4" style={{fontSize: "15px"}}>*Pay at Venue does not guarantee entry as such events function as a first come first serve basis.</p>
              </div>
            </div>
              <h2 className='primary-header ml-2'>Attendee List</h2>
            <div className='card mt-lg-0 col-lg-10 col p-md-4 p-2' style={{border: "none", borderRadius: "10px", background: "#F4F6F6"}}>
          <table className="table">
          <thead>
            <tr className="" style={{background: "black", color: "white"}}>
              <th  scope="col" style={{border: "none", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}>No.</th>
              <th  scope="col" style={{border: "none", borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>Name</th>
            </tr>
            </thead> 
              <tbody>
              {attendeeInfo?.map((identity, fields)=>{
            return <><tr >
            <th style={{border: "none"}} scope="row">{fields + 1}</th>
            <td className='ml-3'>{identity?.attendee_name}</td>
          </tr></>
            })}
              </tbody>
            </table>
            </div>
          </div>
          <div className='col-lg-4 mb-4 mb-lg-0 px-4 px-mb-2' style={{order: "3"}}>
            <div className="card p-3" style={{ border: "2px  solid black", borderRadius: "10px"}}>
            <div className="d-flex w-100 pb-3 mb-3" style={{width: "24rem", borderBottom: "1px solid #E8EBEE"}}>
            <img className="align-self-center" style={{width: "70px", height: "70px", borderRadius: "10px"}} src={eventInfo?.images_url} alt="Club"/>
            <div className="d-flex flex-column ml-3">
              <p className="m-0 mb-2 primary-header" style={{fontSize: "20px", fontWeight: '400'}}>{eventInfo?.event_name}</p>
              <div className='d-flex align-items-start' style={{fontSize: "14px", fontWeight: "100"}}><i className="bi bi-geo-alt-fill mr-1"></i><p className='m-0' style={{fontSize: "11px", fontWeight: "400"}}>{eventInfo?.event_venue}</p></div>
              <div className='d-flex align-items-start' style={{fontSize: "14px", fontWeight: "100"}}><i className="bi bi-calendar mr-1"></i><p className='m-0' style={{fontSize: "11px", fontWeight: "400"}}>{eventInfo?.timings?.slice(0,9)}. {formattedDate.slice(0,9)}</p></div>
            </div>
            </div>
            <div>
              <p className='primary-header' style={{fontSize: "18px", fontWeight: "400"}}>Price Info</p>
              {billInfo?.map((identity, fields)=>{
                return  <div className='d-flex align-items-center mb-2 pb-3' key={fields} style={{borderBottom: "1px solid #E8EBEE"}}><div className='d-flex flex-column'><p className='m-0'>{identity.ticket_categories}<small className='ml-1' style={{fontSize: "11px", color: "crimson"}}>{identity.quantity}x{identity.total_price}</small></p>
                <p className='m-0' style={{fontWeight: "100", fontSize: "12px"}}>{identity.description}</p></div>
                <div className='ml-auto mr-4' style={{fontSize: "20px", color: "crimson"}}>₹{identity.total_price}</div></div>
              })}
              <div className='d-flex align-items-center mb-2 pb-3' style={{borderBottom: "1px solid #E8EBEE"}}><div className='d-flex flex-column'><p className='m-0'>TGST</p>
                <p className='m-0' style={{fontWeight: "100", fontSize: "12px"}}>CGST + SGST</p></div>
                <div className='ml-auto mr-4' style={{fontSize: "20px", color: "crimson"}}>₹0</div></div>
            </div>
            <div className='d-flex align-items-center mb-2 p-3' style={{background: "#F6F7F8", borderRadius: "10px"}}>
              <p className='m-0 d-flex flex-column'>Total<small style={{fontSize: "12px", fontWeight: "100"}}>(Tax Exclusive)</small></p>
              <div className='ml-auto mr-2' style={{fontSize: "20px"}}>₹{sum}</div>
            </div>
            <button onClick={CreateOrder} className='btn col-lg-12 mt-2 text-white' style={{background: "black", borderRadius: "10px"}}>
              {!isLoading && <span>Pay Now</span>}
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
            </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
