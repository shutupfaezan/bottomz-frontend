import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../../common/GlobalHeader";

export default function TicketOutput() {
  const [eventDetails, setEventDetails] = useState();
  const user_tickets = async () => {
    return await axios.get(
      `https://nightlife-2710.herokuapp.com/user-tickets?order_id=${sessionStorage.order_id}&access_token=${sessionStorage.token}`
    );
  };

  useEffect(() => {
    user_tickets()
      .then((response) => {
        setEventDetails(response?.data?.Event_details);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <GlobalHeader />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="col col-md-6 py-3 px-2 w-100">
          <div
            className="p-md-3 p-3 w-100 d-flex"
            style={{
              borderRadius: "10px",
              border: "2px solid black",
              boxShadow: "7px 7px #E8EBEE",
            }}
          >
            <img
              className="col-3 w-100 p-0"
              style={{ height: "100px", borderRadius: "7px" }}
              alt=""
              src={eventDetails?.[0]?.images_url}
            />
            <div className="overflow-auto col">
              <div className="text-truncate overflow-hidden">
                <b>{eventDetails?.[0]?.event_name}</b>
              </div>
              <div className="d-flex mt-1 overflow-auto align-items-center">
                <div
                  className="overflow-hidden text-truncate"
                  style={{ fontSize: "0.7rem", fontWeight: "400" }}
                >
                  {eventDetails?.[0]?.event_venue}
                </div>
              </div>
              <div className="d-flex mt-1">
                <div style={{ fontSize: "0.7rem", fontWeight: "400" }}>
                  {eventDetails?.[0]?.timings} • {eventDetails?.[0]?.date}
                </div>
              </div>
              <div className="d-flex mt-1 align-items-center">
                <div style={{ fontSize: "0.7rem", fontWeight: "400" }}>
                  {eventDetails?.[0]?.price_range}
                </div>
              </div>
            </div>
          </div>
        </div>
        <b style={{ fontSize: "25px", marginTop: "10px", color: "green" }}>
          Order Generated Successfully
        </b>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <p
            style={{ fontSize: "20px", marginTop: "10px", marginBottom: "0px" }}
          >
            Your Order ID
          </p>
          <p style={{ fontSize: "24px", marginTop: "5px" }}>
            {sessionStorage.order_id}
          </p>
        </div>
        <div className="d-flex justify-content-md-center justify-content-between w-100 pt-md-5 px-md-5 pt-4">
          <p className="text-center mr-md-4">Mode of Payment: Pay at Venue</p>
          <p className="text-center ml-md-4">Payment Status: Unpaid</p>
        </div>
        <div className="d-flex justify-content-md-center flex-column justify-content-between w-100">
          <p className="text-center p-3 mb-0">A copy of the ticket has been send to the registered email.</p>
          <p className="text-center">You can find Another copy in User &gt; Tickets</p>
        </div>
      </div>
    </div>
  );
}
