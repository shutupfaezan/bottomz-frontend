import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import {
    ThemeProvider,
    createTheme,
    lightThemePrimitives
  } from "baseui";

export default function PromoterEventStat() {
    const params = useParams()
    const [eventData, setEventData] = useState()
    const [activeKey, setActiveKey] = useState(0);
    const [orderData, setOrderData] = useState()
    const OnGoingEventdata = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_name=${params.event_name}&promoter_access_token=${sessionStorage?.token}`)}
    useEffect(() => {
        OnGoingEventdata()
        .then((response) => {
            setEventData(response?.data?.Event_Information)
            setOrderData(response?.data?.Order_Details)
            })
            .catch((error) => {
                console.log(error);
            });
            // eslint-disable-next-line
        }, []);
    
    const order_array = orderData?.map?.(response => response?.ticket_category)
    const controlled_orders = [...new Set(order_array)]
    const genre = eventData?.genre?.split(", ")


  return (
    <div className='pt-4 w-100'>
        <div className='d-md-flex my-5'>
        <div className="p-3 ml-md-5 mr-md-4 mx-auto" style={{maxWidth: "100%", border: "2px solid black", minWidth: "fit-content", display: "flex", borderRadius: "10px", width: "fit-content", height: "fit-content"}}>  
          <img style={{height:"auto", maxHeight: "200px", maxWidth: "100%", borderRadius: "10px"}} src={eventData?.images_url} alt=""/>
        </div>
        <div className=' pl-4 mt-md-0 mt-4 w-100'>
          <b className=''> <i className="bi bi-calendar4 mr-3"></i>{eventData?.timings} • {eventData?.date}</b>
          <h1 className='primary-header mt-3'>{eventData?.event_name}</h1>
          <p className='mt-3'><i className="bi bi-geo-alt mr-1"></i> {eventData?.event_venue}</p>
          <p className="mt-2"><i className="bi bi-person-circle mr-2"></i>{eventData?.curated_by}</p>
          {genre?.map((identity, index)=>{
              return (<p className="d-inline-flex p-2 mr-2" style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
          })}
        </div>
        <div>
        </div>
      </div>
        <div className='overflow-scroll'>
        <ThemeProvider
      theme={createTheme(lightThemePrimitives, {
        colors: { borderSelected: "blueviolet" }
      })}
    >
        <Tabs activeKey={activeKey}  onChange={({ activeKey }) => {setActiveKey(activeKey)}} fill={FILL.fixed} activateOnFocus>
        {controlled_orders?.map((identity, index)=>{
    const filteredOrders = orderData?.filter(order => order.ticket_category === identity);
    return (
        <Tab title={identity}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>UserName</th>
                        <th>Quantity</th>
                        <th>Bill Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders?.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.user_name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total_price}</td>
                            <td style={{color: order?.status === "Unpaid" ? "#b10808": "green"}}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Tab>
    )
})}

        </Tabs>
        </ThemeProvider>
        </div>
    </div>
  )
}
