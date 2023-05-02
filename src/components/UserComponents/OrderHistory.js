import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from "../../common/Footer";

export default function OrderHistory() {
const navigate = useNavigate()
const [tickets, setTickets] = useState();
const [loading, setloading] = useState(false)

const order_history = async () => {
  setloading(true)
  return await axios.get(
      `https://nightlife-2710.herokuapp.com/user-ticket-history-pt2?access_token=${sessionStorage.token}`
      );
    };

    useEffect(() => {
        order_history()
        .then((response) => {
          setloading(false)
          setTickets(response?.data?.Ticket_history)
        })
        .catch((error) => {
          setloading(false)
          console.log(error);
        });
        //eslint-disable-next-line
      }, []);

      const groupedOrders = tickets?.reduce((acc, order) => {
        const date = order.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(order);
        return acc;
      }, {});

      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-")
        const date = new Date(year, month - 1, day)
        const options = {year: 'numeric', month: 'long', day: 'numeric', weekday: "long" }
        return date.toLocaleDateString('en-US', options)
      }

      return (
        <>
        <div>
          {loading && <div className='d-flex justify-content-center mt-auto vh-100'>
          <div className='d-flex align-items-center'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
          </div>
          </div>}
          {!loading && 
          <>
          <nav className='w-100 bg-light'>
          <i className="fa-solid fa-arrow-left m-3" onClick={()=>navigate("/")} style={{fontSize: "30px"}}></i>
        </nav>
        <div className='mb-5 mb-2 mb-md-3 py-5' style={{ background: "black"}}>
          <div className='d-flex justify-content-center align-items-center flex-column px-md-5 px-2 mx-lg-4 mx-md-2' style={{height: "100%"}}>
            <div className='primary-header ml-2 text-white text-center' style={{fontSize: "40px"}}>Your Orders</div>
          </div>
        </div>
          <div>
            {groupedOrders &&
              Object.entries(groupedOrders).map(([date, orders]) => (
                <div className="mt-4" key={date}>
                  <div className="date-container px-lg-5 px-4 mb-4">
                    <div className="date-line"></div>
                  <p className="mb-0" style={{color: "crimson"}}>{formatDate(date)}</p>
                    <div className="date-line"></div>
                  </div>
                  {orders?.map((order) => (
                    <div className="px-lg-5 pb-md-4 d-flex flex-column flex-md-row px-4 pb-4">
                    <div className="col-md-8 d-flex py-3 flex-md-row flex-column " style={{border: "2px solid black", borderRadius: "10px", boxShadow: "10px 10px #E8EBEE"}} onClick={()=>{navigate(`/order-history/${order?.order_id}`); sessionStorage.setItem
                  ("order_id", order?.order_id)}}>
                    <div className="ticketImage col-md-4 p-0">
                    <div style={{background: `url(${order.event_details?.images_url}) no-repeat center/cover`, height: "100%", width: "100%", filter: "blur(3px)", borderRadius: "10px"}}></div>
                      <img style={{position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)", height: "100%", maxWidth: "100%", borderRadius: "10px"}} src={order.event_details?.images_url} alt=""/>
                    </div>
                    <div className="col-md-8 mt-3 mt-md-0">
                      <p className="mb-2" style={{fontSize: "20px"}}>{order.event_details?.event_name}</p>
                      <b style={{display: "block", marginBottom: "5px"}}><i className="fa-regular fa-calendar mr-2"></i>{order.event_details?.timings} • {formatDate(order.event_details?.date)}</b>
                      <b style={{display: "block", marginBottom: "5px"}}><i className="fa-regular fa-circle-user mr-2"></i>{order.event_details?.curated_by}</b>
                    <div>(Click To view more details)</div>
                    </div>
                  </div>
                  <div className="col-md-4 py-3 text-white pt-4 d-flex flex-column justify-content-center" style={{background: "black", borderRadius: "10px", boxShadow: "10px 10px #E8EBEE"}}>
                    <p className="pt-0 pt-md-0 text-center" style={{fontSize: "24px"}}>Your Order ID is {order?.order_id}</p>
                  </div>
                </div>
                  ))}
                </div>
              ))}
          </div>
          <Footer/>
          </>}
        </div>
        </>
      );
      
      
}


