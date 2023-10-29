  import axios from 'axios'
  import React, { useState, useEffect } from 'react'
  import { useParams } from "react-router-dom";
  import "../../css/Checkout.css"
  import Input from "../../common/Input"
  import {useNavigate} from "react-router-dom"
  
  export default function Checkout() {
    const [eventData, setEventData] = useState()
    const [quantityError, setQuantityError] = useState()
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
  const updatedAttendees = [...attendees];

  if (quantity > 0) {
    const newSelectedTicket = {
      ticket_category: ticketCategory.ticket_category,
      cover_description: ticketCategory.cover_description,
      quantity,
      description: ticketCategory.description,
      total_price: quantity * price,
      attendees: Array.from({ length: quantity }, () => ({ attendee_name: "" })),
    };

    // Update the selected tickets
    const existingTicketIndex = updatedSelectedTickets.findIndex(
      (selectedTicket) =>
        selectedTicket.ticket_category === ticketCategory.ticket_category &&
        selectedTicket.cover_description === ticketCategory.cover_description
    );

    if (existingTicketIndex !== -1) {
      updatedSelectedTickets[existingTicketIndex] = newSelectedTicket;
    } else {
      updatedSelectedTickets.push(newSelectedTicket);
    }

    updatedAttendees.push(...newSelectedTicket.attendees);
  } else {
    // If quantity is 0, remove the selected ticket
    const existingTicketIndex = updatedSelectedTickets.findIndex(
      (selectedTicket) =>
        selectedTicket.ticket_category === ticketCategory.ticket_category &&
        selectedTicket.cover_description === ticketCategory.cover_description
    );

    if (existingTicketIndex !== -1) {
      updatedSelectedTickets.splice(existingTicketIndex, 1);
    }
  }

  const anyTicketsSelected = updatedSelectedTickets.length > 0;

  setAreTicketsSelected(anyTicketsSelected);

  const totalQuantity = updatedSelectedTickets.reduce(
    (total, selectedTicket) => total + selectedTicket.quantity,
    0
  );

  if (totalQuantity > 10) {
    setQuantityError("You cannot select more than 10 tickets.");
  } else {
    setQuantityError(null);
  }

  setAttendees(updatedAttendees);
  setSelectedTickets(updatedSelectedTickets);
};

    const calculateTotalAmount = () => {
      const totalAmount = selectedTickets.reduce((total, selectedTicket) => {
        return total + selectedTicket.total_price;
      }, 0);
      return totalAmount;
    };
    console.log("attendees", attendees)
    console.log("Selected tickets", selectedTickets)
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
        // If the count is already 0, remove the selected ticket
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
      // const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      return `${formattedDate}`;
    };

    return (
      <>
      <div className='p-2'>
        <div className='w-100' style={{background: "#0F0F0F", height: "900px", borderRadius: "20px", color: "white"}}>
          <div className='d-flex align-items-center p-4'>
            <span className="rounded-pill align-items-center d-flex justify-content-center" style={{border: "2px solid white", width: "40px", height: "40px"}}>
              <i className="bi bi-arrow-left" style={{fontSize: "20"}}></i>
            </span>
            <p className='m-0 ml-3' style={{fontWeight: "700", fontSize: "18px"}}>CHECKOUT</p>
          </div>
          <div className='d-flex justify-content-center' style={{gap: "15px"}}>
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
          <div className='d-flex mt-5 pt-5 px-5'>
            <div className="pr-1 col-lg-6">
              <div className='p-0 d-flex'>
                  <img className="col-lg-5 p-0" style={{height: "215px", width: "215px", objectFit: "cover", borderRadius: "15px"}} src={process.env.PUBLIC_URL + "/images/posterevent.png"} alt=""/>
                  <div className='pl-4 py-2 col-lg-7 pl-0'>
                    <h3 className="" style={{fontWeight: "800", color: "rgba(255, 255, 255, 1)", textTransform: "uppercase"}}>{eventData?.event_name.slice(0,26)}</h3>
                    <div className='d-flex align-items-baseline mt-4'><p className='mb-2' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "16px"}}><i className="fa-regular fa-calendar mr-2" style={{fontSize: "20px"}}></i>{formatDate(eventData?.date)} | {eventData?.timings}</p></div>
                    <div className='d-flex align-items-baseline mt-2'><p className='mb-0' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", fontSize: "16px"}}><i className="fa-solid fa-location-dot mr-2" style={{fontSize: "20px"}}></i>{eventData?.event_venue}</p></div>
                  </div>
              </div>
              {checkoutStatus === 0 && <div className="form-check mt-4 w-100 d-flex align-items-center px-1">
                <input className="form-check-input" type="checkbox" value="" style={{border: "1px solid white"}}/>
                <p className="form-check-label ml-2" style={{fontSize: "14px"}}>By clicking you agree to the terms and conditions waiver</p>
              </div>}
            </div>
            {checkoutStatus === 0 && <div className='col-lg-6 px-5'>
              <div className='col p-3' style={{background: "white", color: "black", borderRadius: "15px"}}>
                <div style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                  {ticketData?.map((ticketCategory, index) => (
                    <>
                      {index !== 0 && <hr className='mx-auto' style={{width: "90%", background: "rgba(0, 0, 0, 0.20)", height: "1px"}}/>}
                      <div className='py-3 px-4 d-flex' key={index}>
                        <div>
                          <p className="mb-0" style={{fontWeight: "600"}}>{ticketCategory?.ticket_category} <i className="fa-solid fa-chevron-down ml-1" style={{fontSize: "14px"}}  onClick={() => toggleContentVisibility(index)}></i></p>
                          {isContentVisible[index] && <span className="mb-0" style={{fontWeight: "100", color: "rgba(0, 0, 0, 0.60)", fontSize: "12px"}}>{ticketCategory?.cover_description}</span>}
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
                      <p className="mb-0" style={{fontWeight: "700", fontSize: "25px", color: "#646464"}}>₹ {calculateTotalAmount().toFixed(2)}</p>
                    </div>
                    <div className='ml-auto my-auto'>
                    <button className="btn rounded-pill" onClick={()=>{setCheckoutStatus(1)}} style={{ background: "black", color: "white", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected}>Book Your Spot <i className="fa-solid fa-arrow-right ml-2"></i></button></div>
                  </div>
                </div>
              </div>
                {quantityError && <p className="error-message text-center mt-3 text-danger">{quantityError}</p>}
            </div>}
            {checkoutStatus === 1 && (
              <div className="col-lg-6 px-5">
                <div className="col px-3 py-4" style={{ background: "white", color: "black", borderRadius: "15px" }}>
                  <h5 style={{ fontWeight: "800", color: "black", textTransform: "uppercase", lineHeight: "35px" }}>
                    Quite the list. Who’s attending?
                  </h5>
                  <p style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.60)", fontSize: "15px" }}>
                    These names will be included in the ticket and can’t be changed later
                  </p>
                  <div  className="p-3" style={{ background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px" }}>
                    {selectedTickets?.map((ticket, index) => (
                      <div key={index} className="mb-3">
                        <p style={{ fontWeight: "600" }}>{ticket.ticket_category}<span className='p-2'>({ticket.quantity})</span></p>
                        {Array.from({ length: ticket.quantity }).map((_, i) => (
                          <div key={i} className="mb-3">
                            <Input type="text" icon="fa-regular fa-user" style={{ ...inputStyle, color: "black", iconColor: "rgba(0, 0, 0, 0.4)", fontSize: "14px"}} placeholder="Enter Attendee Full Name"  handleChange={(e) => {
            const updatedAttendees = [...attendees];
            if (updatedAttendees[index]) {
              // Update the attendee name for the corresponding ticket category and index
              updatedAttendees[index].attendee_name = e.target.value;
            }
            setAttendees(updatedAttendees);
          }}/>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                <div className="mt-3" style={{background: "#F7F7F7", border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "15px"}}>
                  <div className='py-3 px-4 d-flex'>
                    <div className='my-auto col-lg-6 px-0 pr-1'>
                      <button className="btn rounded-pill col" onClick={()=>{navigate("/")}} style={{ background: "rgba(255, 51, 74, 0.10)", color: "#FF334A", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected}>Cancel</button>
                    </div>
                    <div className='my-auto col-lg-6 px-0 pl-2'>
                      <button className="btn rounded-pill col" onClick={()=>{setCheckoutStatus(2)}} style={{ background: "black", color: "white", fontWeight: "600", padding: "12px 30px"}} disabled={!areTicketsSelected}>Next <i className="fa-solid fa-arrow-right ml-2"></i></button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    )
  }
