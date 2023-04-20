import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from "../../common/SearchBar"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function PromoterEventStat() {
  const params = useParams()
    const [eventData, setEventData] = useState()
    const [orderData, setOrderData] = useState()
    useEffect(() => {
      const fetchEventData = async () => {
          try {
              const { data } = await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_name=${params.event_name}&promoter_access_token=${sessionStorage?.token}`);
              const { Event_Information, Order_Details } = data;
              setEventData(Event_Information);
              setOrderData(Order_Details);
          } catch (error) {
              console.log(error);
          }
      };
      fetchEventData();
  }, [params.event_name]);
    
        const order_array = orderData?.map?.(response => response?.ticket_category)
        const controlled_orders = [...new Set(order_array)]
        const genre = eventData?.genre?.split(", ")

        const paidOrders = orderData?.filter((order) => order.status === "Paid");
        const ticketsBought = paidOrders;
        const unpaidTick = orderData?.filter((order) => order.status === "Unpaid");


    const totalPaidPrice = paidOrders?.reduce(
      (total, order) => total + parseFloat(order.total_price),
      0
    );
    const totalTicks = ticketsBought?.reduce(
      (total, order) => total + parseFloat(order.quantity),
      0
    );
    const upaidQty = unpaidTick?.reduce(
      (total, order) => total + parseFloat(order.quantity),
      0
    );

    const commisionPrice = totalPaidPrice * 0.02

  return (
  <div>
    <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
      <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
      </nav>
    <div className='pt-4 w-100'>
    <SearchBar orders={()=>orderData}/>
      <div className='d-md-flex flex-md-column flex-lg-row my-5 px-md-5 px-0'>
        <div className='d-md-flex col-lg-8 p-0'>
        <div className="p-3 ml-md-5 mr-md-4 mx-auto" style={{maxWidth: "100%", border: "2px solid black", minWidth: "fit-content", display: "flex", borderRadius: "10px", width: "fit-content", height: "fit-content"}}>  
          <img style={{height:"auto", maxHeight: "200px", maxWidth: "100%", borderRadius: "10px"}} src={eventData?.images_url} alt=""/>
        </div>
        <div className=' pl-4 mt-md-0 mt-4 w-100'>
          <b className=''> <i className="bi bi-calendar4 mr-3"></i>{eventData?.timings} • {eventData?.date}</b>
          <h1 className='primary-header mt-3'>{eventData?.event_name}</h1>
          <p className='mt-3'><i className="bi bi-geo-alt mr-1"></i> {eventData?.event_venue}</p>
          <p className="mt-2"><i className="bi bi-person-circle mr-2"></i>{eventData?.curated_by}</p>
          {genre?.map((identity, index)=>{
              return (<p className="d-inline-flex p-2 mr-2" key={index} style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
          })}
        </div>
      </div>
     <div className='w-100 d-flex flex-lg-column flex-md-row flex-column mt-md-5 mt-lg-0 p-3'>
      <div className='w-100 d-flex  mr-3' style={{height: "100%"}}>
        <div className='col col-lg d-flex flex-column mb-3 mr-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{totalPaidPrice}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Total Revenue</p></div>
        <div className='col col-lg d-flex flex-column mb-3 mr-lg-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{totalTicks}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Paid Tickets</p></div>
      </div>
      <div className='w-100 d-flex' style={{height: "100%"}}>
        <div className='col col-lg d-flex flex-column mb-3 mr-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{commisionPrice}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Commission</p></div>
        <div className='col col-lg d-flex flex-column mb-3 mr-lg-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{upaidQty}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Unpaid Tickets</p></div>
      </div>
    </div>

      </div>
      <div className='overflow-scroll mx-md-5 d-flex d-md-block'>
        <Tabs>
          <TabList style={{padding: "5px", marginBottom: "3rem"}}>
            {controlled_orders?.map((identity, index) => (
              <Tab key={index}>{identity}</Tab>
            ))}
          </TabList>
          {controlled_orders?.map((identity, index) => {
            const filteredOrders = orderData?.filter(
              (order) => order.ticket_category === identity
            );
            return (
              <TabPanel key={index}>
                <table className="table">
                  <thead style={{color: "white", background: "black"}}>
                    <tr>
                      <th>Order Id</th>
                      <th>UserName</th>
                      <th>Quantity</th>
                      <th>Bill Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders?.map((order, key) => (
                      <tr key={key}>
                        <td>{order.order_id}</td>
                        <td>{order.user_name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.total_price}</td>
                        <td
                          style={{
                            color:
                              order?.status === "Unpaid" ? "#b10808" : "green",
                          }}
                        >
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </div>
    </div>
  )
}
