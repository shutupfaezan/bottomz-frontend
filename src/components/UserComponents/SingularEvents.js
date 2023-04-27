    import React, { useState } from 'react'
    import axios from 'axios'
    import { useEffect } from 'react'
    import { useNavigate, useParams } from "react-router-dom";
    import QuantityFields from './QuantityFields';
    import { SingularContext } from '../../contexts/Context';
    import {useContext} from 'react'
    import Footer from "../../common/Footer"
    import GlobalHeader from '../../common/GlobalHeader';
    import AttendeeModal from '../../common/AttendeeModal';
    import "../../css/SingularEvent.css"

    export default function SingularEvents() {
        const {setShow, setInputModal, inputValues} = useContext(SingularContext);
        const [singleEvent, setSingleEvent] = useState()
        const [ticketConfig, setTicketConfig] = useState()
        const [clubDetail, setClubDetail] = useState()
        const [isloading, setIsLoading] = useState(true)
        const navigate = useNavigate()
        const params = useParams()
        const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params.event_name}`)}
        useEffect(() => {
          event()
          .then((response) => {
            setIsLoading(false)
            setSingleEvent(response?.data?.event_data)
            setTicketConfig(response?.data?.ticket_categories)
            setClubDetail(response?.data?.venue_information?.[0])
          })
          .catch((error) => {
            console.log(error);
          });
          //eslint-disable-next-line
        }, []);
        
        const newTerms  = singleEvent?.terms?.slice(2, singleEvent?.terms?.length - 2).split(`","`)
        const genre = singleEvent?.genre?.split(", ")
        // const paymentsObj ={
        //   access_token: sessionStorage?.token,
        //   purpose: ,
        //   amount: 0
        // }
        // function paymentsCreate(){
          
        // }


        console.log(inputValues)

        const {numSelected, totalPrice} = inputValues?.reduce((acc, curr) => {
          const quantity = curr?.quantity ? parseInt(curr?.quantity, 10) : 0;
          const total_price = parseInt(curr?.total_price);
          return {
            numSelected: acc?.numSelected + quantity,
            totalPrice: acc?.totalPrice + total_price
          };
        }, {numSelected: 0, totalPrice: 0});
        
        return (
          <>
          <GlobalHeader/>
          {isloading && <div className='d-flex justify-content-center' style={{marginTop: "75px"}}>
            <div className='d-flex align-items-center'>
            <span style={{fontSize: "35px"}}>Loading </span>
            <div className="my-auto spinner-border text-black " role="status">
            </div>
            </div>
            </div>}
        {!isloading && <div>
          <div className=' px-md-5 px-3 mt-5'>
          <div className='d-md-flex'>
            <div className="p-3 ml-md-5 mr-md-4 mx-auto" style={{maxWidth: "100%", border: "2px solid black", minWidth: "fit-content", display: "flex", borderRadius: "10px", width: "fit-content"}}>  
              <img style={{height:"auto", maxHeight: "250px", maxWidth: "100%", borderRadius: "10px"}} src={singleEvent?.images_url} alt=""/>
            </div>
            <div className='mt-lg-0 mt-md-0 mt-4 w-100'>
              <b className=''> <i className="bi bi-calendar4 mr-3"></i>{singleEvent?.timings} • {singleEvent?.date}</b>
              <h1 className='primary-header mt-3'>{singleEvent?.event_name}</h1>
              <p className='mt-3'><i className="bi bi-geo-alt mr-1"></i> {singleEvent?.event_venue}</p>
              <p className="mt-2"><i className="bi bi-person-circle mr-2"></i>{singleEvent?.curated_by}</p>
              {genre?.map((identity, index)=>{
                  return (<p className="d-inline-flex p-2 mr-2" style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
              })}
            </div>
            <div>
            </div>
          </div>
            {!singleEvent?.description === null && <div className='mx-md-5 mt-md-5 mt-4'>
              <b className=''>- Description</b>
            <p  className='mt-2 ml-2' style={{fontWeight: "400"}}>{singleEvent?.description}</p>
            </div>}
            <div className='bg-light mx-md-5 mt-md-5 mt-4 px-2 py-4' style={{borderRadius: "10px", background: "#F4F5F6"}}>
              <h1 className='primary-header ml-2'>Ticket Info</h1>
              {ticketConfig?.[0] ? <div>
                <table className="table">
                    <tbody id="tickselect">
                      {ticketConfig?.map((identity, fields)=>{
                          return <QuantityFields identity={identity} key={fields} index={fields}></QuantityFields>
                        })}
                    </tbody>
                  </table>
                  <div className='d-flex'>
                <button style={{background: "black", borderRadius: "10px"}}  className='btn my-2 col-12 col-md-6 col-lg-4 mx-auto text-white' type="submit" onClick={()=>{sessionStorage.token ? setInputModal(true) : setShow(true)}}>
                  <span>{sessionStorage.token ? "Get Tickets" : "Log In/Sign Up to Continue"}</span>
                </button>
                </div>
                <div className='text-center mt-4'> {numSelected} Selected - Rs. {totalPrice}</div>
              </div> : <div className='ml-3'><b>Ticketing info doesnt exist</b><p style={{color: "#6a6868"}}>Be the first to report the error and get some perks</p></div>}
            </div>
            <div className='mx-md-5 mt-md-5 my-4'>
              <b className=''>- Terms & Conditions</b>
            <p className='mt-2 ml-2' style={{fontWeight: "400"}}><ul className='pl-3'>{newTerms?.map((fields, index )=> {
              return <li style={{color: "black", fontWeight: 400}} key={index}>{fields}</li>
            })}</ul></p>
            </div>
          {clubDetail !== undefined && <div  className='mx-md-5 my-md-5 my-4'>
            <b>- Hosted Club</b>
            <div className='p-md-3 p-3 w-100 col-md-6 mt-3 d-flex shadow-sm' style={{borderRadius: "10px", background: "white", border: "2px solid black"}} onClick={()=>{navigate(`/all-clubs/` + clubDetail?.club_name)}}>
              <img className="col-3 w-100 p-0" style={{height: "90px", borderRadius: "7px"}} alt="" src={clubDetail?.images_url}/> 
              <div className='overflow-auto col'>
                <div className='text-truncate overflow-hidden'><b>{clubDetail?.club_name}</b></div>
                <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubDetail?.full_address}</div></div>
                <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubDetail?.opening_time}</div></div>
                <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubDetail?.cost}</div></div>
                <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubDetail?.contact}</div></div>
              </div>
            </div>
            </div>}
            <AttendeeModal/>
          </div>
            <Footer/>
          </div>}
        </>
      )
    }
