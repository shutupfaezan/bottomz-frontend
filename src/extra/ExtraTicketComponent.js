import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuantityFields from "./QuantityFields";
import { SingularContext } from "../../contexts/Context";
import { useContext } from "react";
import Footer from "../../common/Footer";
import GlobalHeader from "../../common/GlobalHeader";
import AttendeeModal from "../../common/AttendeeModal";
import "../../css/SingularEvent.css";

export default function ExtraTicketComponent() {
  const { setShow, setInputModal, inputValues } = useContext(SingularContext);
  const [singleEvent, setSingleEvent] = useState();
  const [ticketConfig, setTicketConfig] = useState();
  const [clubDetail, setClubDetail] = useState();
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  console.log(singleEvent);
  const event = async () => {
    return await axios.get(
      `https://nightlife-2710.herokuapp.com/events/${params.event_name}`
    );
  };
  useEffect(() => {
    event()
      .then((response) => {
        setIsLoading(false);
        setSingleEvent(response?.data?.event_data);
        setTicketConfig(response?.data?.ticket_categories);
        setClubDetail(response?.data?.venue_information?.[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);
  const genre = singleEvent?.genre?.split(", ");

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr?.split("-");
    const date = new Date(year, month - 1, day);
    const options = { month: "short", day: "numeric" };
    return date?.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="position-relative">
        <GlobalHeader />
        <div className="">
          <img
            style={{width: "100%", height: "200px", objectFit: "cover", filter: "brightness(0.3)"}} src={singleEvent?.images_url}></img>
        </div>
        <div className="position-relative px-md-5 px-3" style={{ top: "-90px" }}>
          <div className="px-0 px-md-5">
          <div className="p-4 px-md-5 px-4" style={{ background: "black", borderRadius: "10px" }}>
            <div className="d-md-flex text-center text-md-start ">
              <div className="col-lg-6 d-md-flex align-items-center">
                <h3 className="primary-header" style={{ color: "white" }}>{singleEvent?.event_name}</h3>
              </div>
              <div className="col-lg-6">
                <h1 className="primary-header text-md-end text-center" style={{ color: "white" }}>
                  00:00:00:00
                </h1>
              </div>
            </div>
              <hr style={{height: "3px", backgroundColor: "white"}}></hr>
            <div className="d-flex flex-column flex-md-row">
              <div className="col-lg-4 pt-3">
                <p style={{ color: "white" }}>
                  <i class="fa-regular fa-calendar mr-2"></i>
                  {singleEvent?.timings} • {singleEvent && formatDate(singleEvent?.date)}
                </p>
              </div>
              <div className="col-lg-4 pt-0 pt-md-3">
                <p style={{ color: "white" }}>
                <i class="fa-solid fa-crown mr-2"></i>
                  {singleEvent?.curated_by}
                </p>
              </div>
              <div className="col-lg-4 pt-md-3">
                <p style={{ color: "white" }}>
                  <i class="fa-regular fa-paper-plane mr-2"></i>
                  {singleEvent?.event_venue}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
         <div className="px-5 d-flex">
          <div className="col-lg-6 pr-5">
            <b>• Curated By</b> 
            <p className="ml-2" style={{fontWeight: "100"}}>{singleEvent?.curated_by}</p>
            {singleEvent?.description !== "" && <div><b>•  Description</b> 
            <p className="ml-2" style={{fontWeight: "100"}}>{singleEvent?.description}</p>
            </div>}
            {genre?.map((identity, index)=>{
                  return (
                  <p className="d-inline-flex p-2 mr-2" style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
              })}
          </div>
          <div className="col-lg-6 px-5 py-5 d-flex justify-content-center align-items-center" style={{borderRadius: "10px", background: `${singleEvent?.images_url}`}}>
            <img className="w-100" style={{height: "200px", objectFit: 'contain'}} src={singleEvent?.images_url}></img>
          </div>
        </div> 
         <div className="px-5 d-flex">
          <div className="col-lg-6 pr-5">
            <b>• Curated By</b> 
            <p className="ml-2" style={{fontWeight: "100"}}>{singleEvent?.curated_by}</p>
            {singleEvent?.description !== "" && <div><b>•  Description</b> 
            <p className="ml-2" style={{fontWeight: "100"}}>{singleEvent?.description}</p>
            </div>}
            {genre?.map((identity, index)=>{
                  return (
                  <p className="d-inline-flex p-2 mr-2" style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
              })}
          </div>
          <div className="col-lg-6 px-5 py-5 d-flex justify-content-center align-items-center" style={{background: "black", borderRadius: "10px"}}>
            <img className="w-100" style={{height: "200px", objectFit: 'contain'}} src={singleEvent?.images_url}></img>
          </div>
        </div>
    </div>
    </>
  );
}
