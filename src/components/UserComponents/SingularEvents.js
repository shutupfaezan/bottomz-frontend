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
    import GenericTC from '../../common/GenericTC';

    export default function SingularEvents() {
        const {setShow, setInputModal, inputValues} = useContext(SingularContext);
        const [singleEvent, setSingleEvent] = useState()
        const [getLoader, setGetLoader] = useState(false)
        const [error, setError] = useState()
        const [ticketConfig, setTicketConfig] = useState()
        const [tableConfig, setTableConfig] = useState()
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
            setTableConfig(response?.data?.table_categories)
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
            function handleFormSubmit(event) {
              event.preventDefault();
              if (numSelected > 10) {
                setError("You cannot select Tickets more than 10")
                return;
              }
              if (numSelected === 0) {
                setError("Select a quantity more than 0")
                return;
              }
              if (!sessionStorage.token){
                setShow(true)
              }
              else{
                const filteredValues = inputValues?.filter(val => val.quantity !== null && val.total_price !== null);
                const validateObj = {
                "event_name": singleEvent?.event_name,
                "order_details": filteredValues
            }
            setGetLoader(true)
            setError(null)
            axios.post(`https://nightlife-2710.herokuapp.com/validating-orders?access_token=${sessionStorage?.token}`, validateObj)
            .then(()=>{
              setGetLoader(false)
              setInputModal(true)
            })
            .catch((error)=>{
              setGetLoader(false)
              setError(error?.response?.data?.detail)
            })
          }
        }

        const { numSelected, totalPrice } = inputValues?.reduce((acc, curr) => {
          const quantity = parseInt(curr?.quantity ?? 0, 10);
          const total_price = parseInt(curr?.total_price ?? 0);
          return {
            numSelected: acc?.numSelected + quantity,
            totalPrice: acc?.totalPrice + total_price,
          };
        }, { numSelected: 0, totalPrice: 0 });
        
        useEffect(() => {
          if (numSelected > 10) {
            setError("You cannot select more than 10 tickets")
          } else {
            setError(null)
          }
        }, [numSelected]);

        const formatDate = (dateStr) => {
          const [year, month, day] = dateStr.split("-")
          const date = new Date(year, month - 1, day)
          const options = {year: 'numeric', month: 'long', day: 'numeric', weekday: "long" }
          return date.toLocaleDateString('en-US', options)
        }
        const formatDescription = (description) => {
          if (description) {
            const lines = description.split('\n\n\n\n');
            return lines.map((line, index) => <p key={index}>{line}</p>);
          }
          return null;
        };

        return (
          <>
          <div>
          {isloading && <div className='d-flex justify-content-center mt-auto'>
          <div className='d-flex align-items-center'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
          </div>
          </div>}
          {!isloading && 
          <div>
          <GlobalHeader/>
          <div>
          <div className=' px-md-5 px-3 mt-5'>
          <div className='d-md-flex px-lg-5'>
            <div className="p-0 col-md-6 col-12 mx-auto d-flex w-100" style={{width: "100%", border: "2px solid black", borderRadius: "15px", overflow: "hidden", height: "1005"}}>
            <div style={{background: `url(${singleEvent?.images_url}) no-repeat center/cover`, height: "250px", width: "100%", filter: "blur(3px)"}}></div>
            <img style={{position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)", height: "100%", maxWidth: "100%"}} src={singleEvent?.images_url} alt=""/>
            </div>
            <div className='mt-lg-0 mt-md-0 col-md-6 mt-4 pl-md-5 w-100 d-flex-flex-md-column justify-content-center'>
              <b className=''> <i className="bi bi-calendar4 mr-3"></i>{singleEvent?.timings} • {formatDate(singleEvent?.date)}</b>
              <h3 className='primary-header mt-3'>{singleEvent?.event_name}</h3>
              <p className='mt-3'><i className="bi bi-geo-alt mr-1"></i> {singleEvent?.event_venue}</p>
              <p className="mt-2"><i className="bi bi-person-circle mr-2"></i>{singleEvent?.curated_by}</p>
              {genre?.map((identity, index)=>{
                  return (<p className="d-inline-flex p-2 mr-2" style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee", width: "fit-content"}}>{identity}</p>)
              })}
            </div>
          </div>
            {singleEvent?.description !== "" && <div className='mx-lg-5 mt-md-5 mt-4'>
              <b className=''>- Description</b>
            <p  className='mt-2 ml-2' style={{fontWeight: "400"}}>{formatDescription(singleEvent?.description)}</p>
            </div>}
            <div className='bg-light mx-lg-5 mt-md-5 mt-4 px-2 py-4' style={{borderRadius: "10px", background: "#F4F5F6"}}>
              <h1 className='primary-header ml-2'>Ticket Info</h1>
              {ticketConfig?.[0] ? <div>
                <table className="table">
                    <tbody id="tickselect">
                      {ticketConfig?.map((identity, fields)=>{
                          return <QuantityFields identity={identity} key={fields} index={fields}></QuantityFields>
                        })}
                    </tbody>
                  </table>
              </div> : <div className='ml-3'><b>Ticketing info doesnt exist</b><p style={{color: "#6a6868"}}>Be the first to report the error and get some perks</p></div>}
            </div>
              {tableConfig?.[0] &&
              <>
            <div className='bg-light mx-lg-5 mt-4 px-2 py-4' style={{borderRadius: "10px", background: "#F4F5F6"}}>
              <h1 className='primary-header ml-2'>Table Info</h1>
              <div>
                <table className="table">
                    <tbody id="tickselect">
                      {tableConfig?.map((identity, fields)=>{
                          return <QuantityFields identity={identity} key={fields} index={fields}></QuantityFields>
                        })}
                    </tbody>
                  </table>
                  {singleEvent?.contact !== null && <><div className='d-flex justify-content-center'><p className="text-center" style={{borderBottom: "2px solid black", borderTop: "2px solid black", width: "100%"}}>For table info contact <a target="_blank" style={{color: "crimson"}} href={`tel: +91${singleEvent?.contact}`} rel="noreferrer noopener"> here</a></p></div></>}
              </div>
            </div>
              </>}
            
            <div className='d-flex mt-4 flex-column bg-light mx-lg-5 p-4' style={{borderRadius: "10px"}}>
                <button style={{background: "black", borderRadius: "10px"}}  className='btn my-2 col-12 col-md-6 col-lg-4 mx-auto text-white' type="submit" onClick={handleFormSubmit}>
                    {getLoader && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {getLoader && (<span id="login-loading-text-span">Loading</span>)}
                    {!getLoader && <span id="login-text-span">{sessionStorage.token ? "Get Tickets" : "Log In/Sign Up to Continue"}</span>}
                  <span></span>
                </button>
            {error && <div className='text-center' style={{color: "crimson"}}>{error}</div>}
                <div className='text-center mt-2'> {numSelected} Selected - Rs. {totalPrice}</div>
                </div>

            <div className='mx-lg-5 mt-md-5 my-4'>
              <b className=''>- Terms & Conditions</b>
              <div className='mt-2 ml-2' style={{fontWeight: "400"}}>
            {
              newTerms?.[0] !== "" ?  <ul className='pl-3'>{newTerms?.map((fields, index )=> {
                return <li style={{color: "black", fontWeight: 400}} key={index}>{fields}</li>
              })}</ul> : <GenericTC/> 
            }
            </div>
            </div>
          {clubDetail !== undefined && <div  className='mx-md-5 my-md-5 my-4'>
            <b>- Hosted Club</b>
            <div className='p-md-3 p-3 w-100 col-md-6 mt-3 d-flex shadow-sm' style={{borderRadius: "10px", background: "white", border: "2px solid black"}} onClick={()=>{navigate(`/clubs/` + clubDetail?.club_name)}}>
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
          </div>
          </div>}
          </div>
        </>
      )
    }
