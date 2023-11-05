  import axios from 'axios'
  import React, { useState, useEffect } from 'react'
  import { useParams } from "react-router-dom";
  import "../../css/Checkout.css"
  import Input from "../../common/Input"
  import {useNavigate} from "react-router-dom"
  
  export default function Checkout() {
    const [eventData, setEventData] = useState()
    const [orderCreating, setOrderCreating] = useState(false);
    const [quantityError, setQuantityError] = useState()
    const [validationError, setValidationError] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState(null);
    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false);
    const [orderId, setOrderID] = useState(null);
    // eslint-disable-next-line
    const [attendees, setAttendees] = useState([]);
    const [ticketData, setTicketsData] = useState()
    const [areTicketsSelected, setAreTicketsSelected] = useState(false);
    const [ticketCounts, setTicketCounts] = useState([]);
    const [isContentVisible, setIsContentVisible] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [checkoutStatus, setCheckoutStatus] = useState(0)
    const navigate = useNavigate()
    const params = useParams()
    const bill = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params?.event_name}`)}
    useEffect(() => {
      bill()
      .then((response) => {
        setEventData(response?.data?.event_data)
        setTicketsData(response?.data?.ticket_categories)
        setTicketCounts(Array(response?.data?.ticket_categories.length).fill(0));
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
    }, []);

    const inputStyle = {
      display: "flex",
      padding: "8px 20px",
      gap: "12px",
      width: "100%",
      borderSelfStyles: "1px solid rgba(0, 0, 0, 0.4)",
    };


    const addSelectedTicket = (ticketCategory, quantity) => {
      const { price } = ticketCategory;
    
      const updatedSelectedTickets = [...selectedTickets];
    
      const selectedTicketIndex = updatedSelectedTickets.findIndex(
        (selectedTicket) =>
          selectedTicket.ticket_category === ticketCategory.ticket_category &&
          selectedTicket.cover_description === ticketCategory.cover_description
      );
    
      if (quantity > 0) {
        const newSelectedTicket = {
          ticket_category: ticketCategory.ticket_category,
          cover_description: ticketCategory.cover_description,
          quantity,
          description: ticketCategory.description,
          total_price: quantity * price,
          attendees: Array.from({ length: quantity }, () => ({ attendee_name: "" })),
        };
    
        if (selectedTicketIndex !== -1) {
          updatedSelectedTickets[selectedTicketIndex] = newSelectedTicket;
        } else {
          updatedSelectedTickets.push(newSelectedTicket);
        }
      } else {
        if (selectedTicketIndex !== -1) {
          updatedSelectedTickets.splice(selectedTicketIndex, 1);
        }
      }
    
      const totalAttendees = updatedSelectedTickets.reduce(
        (total, selectedTicket) => total + selectedTicket.quantity,
        0
      );
    
      const anyTicketsSelected = updatedSelectedTickets.length > 0;
    
      if (totalAttendees > 10) {
        setQuantityError("You cannot select more than 10 attendees.");
      } else {
        setQuantityError(null);
      }
    
      setSelectedTickets(updatedSelectedTickets);
      setAreTicketsSelected(anyTicketsSelected);
    
      const updatedAttendees = [];
      updatedSelectedTickets.forEach((selectedTicket) => {
        selectedTicket.attendees.forEach((attendee) => {
          updatedAttendees.push(attendee);
        });
      });
    
      setAttendees(updatedAttendees);
    };
    

    const calculateTotalAmount = () => {
      const totalAmount = selectedTickets.reduce((total, selectedTicket) => {
        return total + selectedTicket.total_price;
      }, 0);
      return totalAmount;
    };
    // console.log("attendees", attendees)
    // console.log("Selected tickets", selectedTickets)
    const incrementCount = (index) => {
      const newTicketCounts = [...ticketCounts];
      newTicketCounts[index] += 1;
      setTicketCounts(newTicketCounts);
    };
  

    const decrementCount = (index) => {
      if (ticketCounts[index] > 0) {
        const newTicketCounts = [...ticketCounts];
        newTicketCounts[index] -= 1;
        setTicketCounts(newTicketCounts);
        addSelectedTicket(ticketData[index], newTicketCounts[index]);
      } else {
        addSelectedTicket(ticketData[index], 0);
      }
    };

    const toggleContentVisibility = (index) => {
      const newIsContentVisible = [...isContentVisible];
      newIsContentVisible[index] = !newIsContentVisible[index];
      setIsContentVisible(newIsContentVisible);
    };

    const formatDate = (dateStr) => {
      if (!dateStr) {
        return "No date available";
      }
      const [year, month, day] = dateStr.split("-");
      const date = new Date(year, month - 1, day);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return `${formattedDate}`;
    };

    const validateOrder = () => {
      const orderDetails = selectedTickets.map((selectedTicket) => {
        return {
          ticket_categories: selectedTicket.ticket_category,
          cover_description: selectedTicket.cover_description,
          description: selectedTicket.description,
          quantity: selectedTicket.quantity,
          total_price: selectedTicket.total_price,
        };
      });

      const order = {
        event_name: eventData?.event_name,
        order_details: orderDetails,
      };

      axios.post(`https://nightlife-2710.herokuapp.com/validating-orders?access_token=${sessionStorage?.token}`, order)
        .then((response) => {
          console.log(response)
          setCheckoutStatus(1)
        })
        .catch((error) => {
          console.error('Error validating the order:', error);
          setValidationError(error?.message);
        });
    };    

    const createOrderObject = () => {
      setOrderCreating(true);
    
      const request = {
        "event_name": eventData?.event_name,
        "event_venue": eventData?.event_venue,
        "timings": eventData?.timings,
        "date": eventData?.date,
        "images_url": eventData?.images_url,
      };
    
      // Extract attendee names from the selectedTickets
      const attendeeValue = selectedTickets
        .flatMap((selectedTicket) => selectedTicket.attendees)
        .map((attendee) => ({ "attendee_name": attendee.attendee_name }));
    
      // Construct order details from selectedTickets
      const order_details = selectedTickets.map((selectedTicket) => ({
        "ticket_categories": selectedTicket.ticket_category,
        "cover_description": selectedTicket.cover_description,
        "description": selectedTicket.description,
        "quantity": selectedTicket.quantity,
        "total_price": selectedTicket.total_price,
      }));
    
      // Assemble the complete order object
      const order = {
        request,
        attendeeValue,
        order_details,
      };
    
      axios.post(`https://nightlife-2710.herokuapp.com/orders?access_token=${sessionStorage?.token}`, order)
        .then((response) => {
          setOrderID(response?.data[0]);
          setQrCodeImageUrl(response?.data[1]);
          setCheckoutStatus(3);
        })
        .catch((error) => {
          console.error('Error creating the order:', error);    
          setOrderCreating(false);
        });
    };

    const resendConfirmation = () => {
    axios.post(`https://nightlife-2710.herokuapp.com/resend-confirmation?order_id=${orderId}&event_name=${eventData?.event_name}&access_token=${sessionStorage?.token}`, "hii")
    .then((response) => {
      setConfirmationMessage('Confirmation sent successfully');
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 7000);
    })
    .catch((error) => {
      console.error('Error resending confirmation', error);
    });
  }

  const areAttendeeNamesFilled = () => {
    return selectedTickets.every((ticket) => {
      return ticket.attendees.every((attendee) => attendee.attendee_name.trim() !== "");
    });
  };  
    
    return (
      <>
      <div className='p-2'>
        <div className='w-100 pb-5' style={{background: "#0F0F0F", borderRadius: "20px", color: "white"}}>
          <div className='d-flex align-items-center p-4'>
            <span className="rounded-pill align-items-center d-flex justify-content-center" style={{border: "2px solid white", width: "40px", height: "40px"}}>
              <i className="bi bi-arrow-left" style={{fontSize: "20"}}  onClick={() => navigate(-1)}></i>
            </span>
            <p className='m-0 ml-3' style={{fontWeight: "700", fontSize: "18px"}}>CHECKOUT</p>
          </div>
          <div className='d-flex justify-content-center mt-5' style={{gap: "15px"}}>
          <div className='d-flex justify-content-center align-items-center' style={{ gap: "15px" }}>
            <div className='d-flex flex-column align-items-center'><span className="rounded-pill align-items-center d-flex justify-content-center" style={{ border: checkoutStatus === 0 ? "none" : "2px solid white", width: "50px", height: "50px", background: checkoutStatus === 0 ? "#F2EF1D" : "transparent", color: checkoutStatus === 0 ? "black" : "white", fontWeight: "600"}}>1</span><p className='mt-3 mb-0' style={{fontSize: '14px', color: checkoutStatus === 0 ? "#F2EF1D" : "white"}}>Event Tickets</p></div>
            <div className="dashed-line" style={{borderTop: "3px dashed #8F8F8F", flexGrow: "1", margin: "0 5px", width: "50px"}}></div>
            <div className='d-flex flex-column align-items-center'><span className="rounded-pill align-items-center d-flex justify-content-center" style={{ border: checkoutStatus === 1 ? "none" : "2px solid white", width: "50px", height: "50px", background: checkoutStatus === 1 ? "#F2EF1D" : "transparent", color: checkoutStatus === 1 ? "black" : "white", fontWeight: "600"}}>2</span><p className='mt-3 mb-0' style={{fontSize: '14px', color: checkoutStatus === 1 ? "#F2EF1D" : "white"}}>Attendees</p></div>
            <div className="dashed-line" style={{borderTop: "3px dashed #8F8F8F", flexGrow: "1", margin: "0 5px", width: "50px"}}></div>
            <div className='d-flex flex-column align-items-center'><span className="rounded-pill align-items-center d-flex justify-content-center" style={{ border: checkoutStatus === 2 ? "none" : "2px solid white", width: "50px", height: "50px", background: checkoutStatus === 2 ? "#F2EF1D" : "transparent", color: checkoutStatus === 2 ? "black" : "white", fontWeight: "600"}}>3</span><p className='mt-3 mb-0' style={{fontSize: '14px', color: checkoutStatus === 2 ? "#F2EF1D" : "white"}}>Payment</p></div>
            <div className="dashed-line" style={{borderTop: "3px dashed #8F8F8F", flexGrow: "1", margin: "0 5px", width: "50px"}}></div>
            <div className='d-flex flex-column align-items-center'><span className="rounded-pill align-items-center d-flex justify-content-center" style={{ border: checkoutStatus === 3 ? "none" : "2px solid white", width: "50px", height: "50px", background: checkoutStatus === 3 ? "#F2EF1D" : "transparent", color: checkoutStatus === 3 ? "black" : "white", fontWeight: "600"}}>4</span><p className='mt-3 mb-0' style={{fontSize: '14px', color: checkoutStatus === 3 ? "#F2EF1D" : "white"}}>Confirmation</p></div>
          </div>
          </div>
          <div className='d-flex mt-lg-5 mt-md-3 pt-5 px-lg-5 px-md-3'>
            <div className={checkoutStatus === 3 ? "pr-lg-1 col-md-6   px-md-1 pl-md-3": "pr-lg-1 col-md-5 col-lg-6 px-md-1 pl-md-3"}>
              <div className='p-0 d-flex flex-md-column flex-lg-row'>
                  <img className="col-lg-5 p-0 col-md-12" style={{height: checkoutStatus !== 3 ? "215px" : "250px", objectFit: "cover", borderRadius: "15px", aspectRatio: "1/1"}} src={process.env.PUBLIC_URL + "/images/posterevent.png"} alt=""/>
                  <div className='pl-lg-4 py-2 col-lg-7 pl-0 mt-md-3 mt-lg-2'>
                    <h2 className="" style={{fontWeight: "800", color: "rgba(255, 255, 255, 1)", textTransform: "uppercase"}}>{eventData?.event_name.slice(0,26)}</h2>
                    <div className='d-flex align-items-baseline mt-4'><p className='mb-2 d-flex' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "16px"}}><i className="fa-regular fa-calendar mr-2" style={{fontSize: "20px"}}></i><span>{formatDate(eventData?.date)} | {eventData?.timings}</span></p></div>
                    <div className='d-flex align-items-baseline mt-2'><p className='mb-0 d-flex' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "16px"}}><i className="fa-solid fa-location-dot mr-2" style={{fontSize: "20px"}}></i><span>{eventData?.event_venue}</span></p></div>
                    {checkoutStatus === 3 && <div className='d-flex align-items-baseline mt-4'><p className='mb-0' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "16px"}}><i className="fa-solid fa-ticket mr-2" style={{fontSize: "20px"}}></i>{attendees.length < 10 ? `0${attendees.length}` : attendees.length} Tickets</p></div>}
                  </div>
              </div>
              {checkoutStatus === 0 && <div className="form-check mt-4 w-100 d-flex align-items-center px-lg-1 pr-1 pl-0">
                <input className="form-check-input" type="checkbox" value="" style={{border: "1px solid white", aspectRatio: "1/1"}} onChange={(e) => setTermsAndConditionsChecked(e.target.checked)}/>
                <p className="form-check-label ml-2" style={{fontSize: "14px"}}>By clicking you agree to the terms and conditions waiver</p>
              </div>}
              {checkoutStatus !== 0 && checkoutStatus !== 3 && <><hr className='mx-auto' style={{background: "white", height: "1px"}}/>
              <div className="p-3 d-flex justify-content-between mt-4" style={{background: "rgba(255, 255, 255, 0.10", borderRadius: "10px"}}>
                <p className='mb-0'>Total Attendees</p>
                <p className='mb-0' style={{fontWeight: "800"}}>{attendees.length < 10 ? `0${attendees.length}` : attendees.length}</p>
              </div></>}
              { checkoutStatus === 3 && <>
                <p className='mt-5'><span style={{color: "#FF334A"}}>*</span>Please check promotions/spams as mails may be wrongly flagged at times</p>
                <p className='mt-3'>For queries, reach out us on <a href="mailto:info@bottmzup.com" target="_blank" rel="noreferrer" style={{color: "#FF334A"}}>info@bottmzup.com</a></p>
                </>}
            </div>
            {/* Stage 1 */}
            {checkoutStatus === 0 && (
              <div className='col-lg-6 col-md-7 px-lg-5 pl-md-3 pr-md-2'>
                <div className='col p-3' style={{background: "white", color: "black", borderRadius: "15px"}}>
                  <div style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                    {ticketData?.map((ticketCategory, index) => (
                      <>
                        {index !== 0 && <hr className='mx-auto' style={{width: "90%", background: "rgba(0, 0, 0, 0.20)", height: "1px"}}/>}
                        <div className='py-3 px-4 d-flex' key={index}>
                          <div>
                            <p className="mb-0" style={{fontWeight: "600"}}>{ticketCategory?.ticket_category} <i className="fa-solid fa-chevron-down ml-1" style={{fontSize: "14px"}}  onClick={() => toggleContentVisibility(index)}></i></p>
                            {isContentVisible[index] && <span className="mb-0" style={{fontWeight: "100", color: "rgba(0, 0, 0, 0.60)", fontSize: "12px"}}>{ticketCategory?.cover_description} | {ticketCategory?.description}</span>}
                            <p className="mt-1 mb-0" style={{fontWeight: "600"}}>{ticketCategory?.price === "0" ? "FREE" : "₹" + ticketCategory?.price}</p>
                          </div>
                          <div className='ml-auto d-flex' style={{background: "#000000", color: "white", borderRadius: "12px", justifyContent: "center", alignItems: "center", height: "50px", alignSelf: "center"}}>
                          <div><i className="fa-solid fa-minus pl-4 pr-3" onClick={() => { decrementCount(index); addSelectedTicket(ticketCategory, ticketCounts[index] - 1);}}></i><span className=''>{ticketCounts[index]}</span><i className="fa-solid fa-plus pr-4 pl-3" onClick={() => { incrementCount(index); addSelectedTicket(ticketCategory, ticketCounts[index] + 1);}}></i></div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="mt-3" style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                    <div className='py-3 px-4 d-flex'>
                      <div>
                        <p className="mb-0" style={{fontWeight: "400"}}>Total</p>
                        <p className="mb-0 total-amount" style={{fontWeight: "700", fontSize: "25px", color: "#646464"}}>₹ {calculateTotalAmount().toFixed(2)}</p>
                      </div>
                      <div className='ml-auto my-auto'>
                      <button className="btn rounded-pill" onClick={()=>{validateOrder()}} style={{ background: "black", color: "white", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected || !termsAndConditionsChecked}>Book Your Spot <i className="fa-solid fa-arrow-right ml-2"></i></button></div>
                    </div>
                  </div>
                </div>
                  { quantityError && <p className="error-message text-center mt-3 text-danger">{quantityError}</p>}
                  { validationError && <p className="error-message text-center mt-3 text-danger">{validationError}</p>}
              </div>
            )}
            {/* Stage 2 */}
            {checkoutStatus === 1 && (
              <div className="col-lg-6 col-md-7 px-lg-5 pl-md-3 pr-md-2">
                <div className="col px-3 py-4" style={{ background: "white", color: "black", borderRadius: "15px" }}>
                  <h5 style={{ fontWeight: "800", color: "black", textTransform: "uppercase", lineHeight: "35px" }}>
                    Quite the list. Who’s attending?
                  </h5>
                  <p style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.60)", fontSize: "15px" }}>
                    These names will be included in the ticket and can’t be changed later
                  </p>
                  <div  className="p-3" style={{ background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px" }}>
                  {selectedTickets?.map((ticket, ticketIndex) => (
                    <div key={ticketIndex} className="mb-3">
                      <p style={{ fontWeight: "600" }}>{ticket.ticket_category} ({ticket.quantity})</p>
                      {Array.from({ length: ticket.quantity }).map((_, attendeeIndex) => (
                        <div key={attendeeIndex} className="mb-3">
                          <Input
                            type="text"
                            icon="fa-regular fa-user"
                            style={{
                              ...inputStyle,
                              color: "black",
                              iconColor: "rgba(0, 0, 0, 0.4)",
                              fontSize: "14px"
                            }}
                            placeholder="Enter Attendee Full Name"
                            handleChange={(e) => {
                              const updatedSelectedTickets = [...selectedTickets];
                              if (updatedSelectedTickets[ticketIndex] && updatedSelectedTickets[ticketIndex].attendees[attendeeIndex]) {
                                updatedSelectedTickets[ticketIndex].attendees[attendeeIndex].attendee_name = e.target.value;
                              }
                              setSelectedTickets(updatedSelectedTickets);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  </div>
                <div className="mt-3" style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                  <div className='py-3 px-4 d-flex'>
                    <div className='my-auto col-lg-6 px-0 pr-1'>
                      <button className="btn rounded-pill col" onClick={()=>{navigate("/")}} style={{ background: "rgba(255, 51, 74, 0.10)", color: "#FF334A", fontWeight: "600", padding: "12px 30px"}}>Cancel</button>
                    </div>
                    <div className='my-auto col-lg-6 px-0 pl-2'>
                      <button className="btn rounded-pill col" onClick={()=>{setCheckoutStatus(2)}} style={{ background: "black", color: "white", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected || !areAttendeeNamesFilled() }>Next <i className="fa-solid fa-arrow-right ml-2"></i></button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}
            {/* Stage 3 */}
            {checkoutStatus === 2 && (
              <div className="col-lg-6 col-md-7 px-lg-5 pl-md-3 pr-md-2">
                <div className="col px-3 py-4" style={{ background: "white", color: "black", borderRadius: "15px" }}>
                  <h5 style={{ fontWeight: "800", color: "black", textTransform: "uppercase", lineHeight: "35px" }}>
                    Pricing Details
                  </h5>
                  <p style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.60)", fontSize: "15px" }}>
                    This price might include merchant fees at the payment page when redirected.
                  </p>
                  <div style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                    <div className='py-3 px-2'>
                      {selectedTickets?.map((ticketInfo, ticketIndex) => (
                        <>
                        <div key={ticketIndex} className="mb-3 d-flex">
                          <div className="col">
                            <p className='mb-0' style={{ fontWeight: "600" }}>{ticketInfo?.ticket_category}</p>
                            <span className="mb-0" style={{fontWeight: "100", color: "rgba(0, 0, 0, 0.60)", fontSize: "12px"}}>{ticketInfo?.cover_description} | {ticketInfo?.description}</span>
                          </div>
                          <div className="col w-100 d-flex justify-content-center align-items-center" style={{ fontWeight: "600", fontSize: "12px"}}>
                            <div className="d-flex justify-content-center align-items-center col-lg-9 mx-auto" style={{border: "1px solid black", borderRadius: "6px", padding: "10px 10px"}}>
                              <span className="mb-0 px-2" style={{fontWeight: "700", color: "black", fontSize: "12px"}}>{ticketInfo?.quantity +`*` + (ticketInfo?.total_price).toFixed(2)/ticketInfo?.quantity}</span>
                            </div>
                          </div>
                          <div className="col d-flex justify-content-center align-items-center payment-price" style={{ fontWeight: "600" }}> ₹ {(ticketInfo?.total_price).toFixed(2)}</div>
                        </div>
                        <hr className='mx-auto' style={{width: "95%", background: "rgba(0, 0, 0, 0.20)", height: "1px"}}/>
                        </>
                      ))}
                      <div className="mb-3 d-flex p-3 mx-2" style={{background: "rgba(0, 0, 0, 0.10", borderRadius: "10px"}}>
                        <div className="col">
                          <p className='mb-0' style={{ fontWeight: "600" }}>Total</p>
                          <p className="m-0" style={{fontWeight: "100", color: "rgba(0, 0, 0, 0.60)", fontSize: "12px"}}>(Tax Exclusive)</p>
                        </div>
                        <div className="col w-100 d-flex justify-content-end align-items-center" style={{ fontWeight: "600"}}>
                          <span className=" d-flex justify-content-center align-items-end mb-0 px-2" style={{ fontWeight: "600", color: "black" }}>
                            ₹ {(calculateTotalAmount()).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3" style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                        <div className='py-3 px-4 d-flex'>
                          <div className='my-auto col-lg-6 px-0 pr-1'>
                            <button className="btn rounded-pill col" onClick={()=>{navigate("/")}} style={{ background: "rgba(255, 51, 74, 0.10)", color: "#FF334A", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected}>Cancel</button>
                          </div>
                          <div className='my-auto col-lg-6 px-0 pl-2'>
                            <button className="btn rounded-pill col" onClick={()=>{createOrderObject()}} style={{ background: "black", color: "white", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected || orderCreating}>Next <i className="fa-solid fa-arrow-right ml-2"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Stage 4 */}
            {checkoutStatus === 3 && qrCodeImageUrl && (
            <div className='w-100 d-flex flex-column align-items-lg-end align-items-md-center pr-lg-5 col-lg col-md-6'>
              <div className="">
                <img className='mb-auto mx-auto d-flex' src={qrCodeImageUrl} style={{ objectFit: "contain" }} alt="QR Code" />
              </div>
              <div className='mt-4 col-md col-lg-7 p-0'>
                  <div className="col pr-lg-0">
                    <button className="btn rounded-pill btn-block" onClick={() => { resendConfirmation() }} style={{ background: "white", color: "black", fontWeight: "600", padding: "12px 0" }}
                      disabled={!areTicketsSelected}
                    >
                      Resend Confirmation <i className="fa-solid fa-rotate-right ml-1"></i>
                    </button>
                  </div>
                  {confirmationMessage && (
                    <p className="confirmation-message text-success text-center mt-4">{confirmationMessage}</p>
                  )}
                </div>
              </div>      
            )}
          </div>
        </div>
      </div>
      </>
    )
  }