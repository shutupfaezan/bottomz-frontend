import axios from 'axios'
import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import {BrowserView, MobileView } from 'react-device-detect';

export default function Checkout() {
  const [billInfo, setBillInfo] = useState()
  const [eventInfo, setEventInfo] = useState()
  const [attendeeInfo, setAttendeeInfo] = useState()

    const params = useParams()
    const bill = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/purchase-details?order_id=${params.order_id}&event_name=${params.event_name}&access_token=${sessionStorage.token}`)}
    useEffect(() => {
        bill()
        .then((response) => {
          setEventInfo(response?.data?.event[0])
          setBillInfo(response?.data?.tickets_bought)
          setAttendeeInfo(response?.data?.attendee_details)
        })
        .catch((error) => {
          console.log(error);
        });
        // eslint-disable-next-line
    }, [])

    const [value, setValue] = React.useState("2");
    let sum = 0
    for (var i = 0; i < billInfo?.length; i++) {
      sum += parseInt(billInfo?.[i]?.total_price);
    }
  return (
    <div>
      <GlobalHeader/>
      <div className="p-lg-5 d-flex flex-column flex-lg-row" style={{marginTop: "70px"}}>
        <div className='col-lg-8 mb-5 mb-lg-0 order-2 order-lg-0'>
          <div className=' mt-lg-0'>
            <h4>Chose your mode of payment</h4>
            <div>
              <RadioGroup value={value} onChange={e => setValue(e.currentTarget.value)} name="number" align={ALIGN.vertical}>
                <Radio value="1" description="If its a small amount, might as well just pay now and be reserved">
                  Pay Now
                  </Radio>
                <Radio value="2" description="Usually used for larger amounts and table bookings">
                  Pay At Venue
                </Radio>
              </RadioGroup>
              <p className="ml-2 mt-4" style={{color: "gray", fontSize: "15px"}}>(Pay at Venue does not guarantee entry as such events function as a first come first serve basis.)</p>
            </div>
          </div>
          <BrowserView className='card mt-lg-0 w-50 p-2'>
            <h4 className='mx-auto mt-2'>Attendee List
            </h4><hr></hr>
            <div className="p-3">
          {attendeeInfo?.map((identity, fields)=>{
          return <><p className='mb-2'>{fields + 1}. {identity?.attendee_name}</p></>
          })}
            </div>
          </BrowserView>
          <MobileView className='card mt-lg-0 w-100 p-2'>
            <h4 className='mx-auto mt-2'>Attendee List
            </h4><hr></hr>
            <div className="p-3">
          {attendeeInfo?.map((identity, fields)=>{
          return <><h5 className='mb-2'>{fields + 1}. {identity?.attendee_name}</h5></>
          })}
            </div>
          </MobileView>

        </div>
        <div className='col-lg-4 mb-4 mb-lg-0'>
          <div className="card p-3">
          <div className="d-flex w-100" style={{width: "24rem"}}>
          <img className="align-self-center mr-2" style={{width: "70px", height: "70px", borderRadius: "14px"}} src={eventInfo?.images_url} alt="Club"/>
          <div className="d-flex flex-column ml-3">
            <div className='d-flex'>
              <p className="m-0 mr-2" style={{color: "#980098"}}>{eventInfo?.date}</p>
              <p className="m-0" style={{color: "gray"}}>{eventInfo?.day.slice(0,3)} • {eventInfo?.timings.slice(0,9)}</p>
            </div>
            <p className="m-0">{eventInfo?.event_name}</p>
            <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{eventInfo?.event_venue}</p>
          </div>
          </div>
          <hr style={{height: "0.2px", marginBottom: "0px"}}/>
          <p className="" style={{fontSize: "12px", color: "grey", margin: "11px 0px"}}>Your booking is protected by <strong style={{color: "black", fontWeight: "100"}}>BottmzUp</strong></p>
          <hr style={{height: "0.1px", marginTop: "0px"}}/>
          <div>
            <p style={{fontStyle: "italic"}}>Price Info</p>
             {billInfo?.map((identity, fields)=>{
              return  <div className='d-flex align-items-center mb-2'><div className='d-flex flex-column'><p className='m-0'>{identity.ticket_category}<small className='ml-1' style={{fontSize: "11px", color: "#014765"}}>{identity.quantity}x{identity.total_price}</small></p>
              <small style={{color: "#8a8a8a", fontSize: "12px"}}>{identity.description}</small></div>
              <div className='ml-auto'>₹{identity.total_price}</div></div>
             })} 
          </div>
          <hr style={{height: "0.1px"}}/>
          <div className='d-flex align-items-center mb-2'><p className='m-0 d-flex flex-column'>Total<small style={{color: "#8a8a8a", fontSize: "12px"}}>(Tax Exclusive)</small></p>
              <div className='ml-auto'>₹{sum}</div></div>

          </div>
        </div>
      </div>
    </div>
  )
}
