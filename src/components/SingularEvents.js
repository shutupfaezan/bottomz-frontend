import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import QuantityFields from './QuantityFields';
import { useNavigate } from 'react-router-dom';
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import GlobalHeader from '../common/GlobalHeader';

export default function SingularEvents() {
    const navigate = useNavigate()
    const {setShow, inputValues} = useContext(SingularContext);
    const [singleEvent, setSingleEvent] = useState()
    const [isLoading, setisLoading] = useState(false);
    const [ticketConfig, setTicketConfig] = useState()
    const order_details = inputValues.filter(obj => obj != null)

    let sum = 0
    for (var i = 0; i < order_details.length; i++) {
      sum += order_details?.[i]?.total_price;
    }
    const params = useParams()
    const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params.event_name}`)}
    function submitinter(){
      setisLoading(true)
      axios.post(`https://nightlife-2710.herokuapp.com/orders?event_name=${singleEvent?.event_name}&user_name=${sessionStorage.token.slice(0,10)}`, order_details )
      .then((response)=>{
        navigate(`${response?.data}`)
        setisLoading(false)}
      ).catch((err)=>{
        console.log(err);
        setisLoading(false)
      })
    }

    useEffect(() => {
      event()
      .then((response) => {
        setSingleEvent(response?.data?.event_data)
        setTicketConfig(response?.data?.ticket_categories)
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
    }, []);

    const newTerms  = singleEvent?.terms?.slice(2, singleEvent?.terms?.length - 2).split(".,")
    return (
    <div>
      <GlobalHeader/>
      <div className='w-100 p-4 d-md-flex' style={{background:"#014765", marginTop: "56px"}}>
        <div style={{maxWidth: "100%"}}>  
          <img style={{height:"auto", maxHeight: "250px", maxWidth: "100%"}} src={singleEvent?.images_url} alt=""/>
        </div>
        <div className='mt-lg-0 mt-md-0 mt-4 w-100'>
          <h2 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_name}</h2>
          <h5 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_venue}</h5>
          <p className="ml-md-4 d-inline-flex p-1 bg-white mt-2 px-3" style={{color: "#1c1d1f", border: "1px solid white", borderRadius: "10px", fontSize: "13px"}}>{singleEvent?.genre}</p>
          <h6 className="ml-md-4" style={{color: "white"}}>Curated by : {singleEvent?.curated_by}</h6>
        </div>
      </div>
      <div className='d-lg-flex'>
        <div className='col-lg-6'>
         {singleEvent?.description !== null && <h4 className='mt-4' style={{color: "#88106f"}}>Description: </h4>}
          <h6>{singleEvent?.description}</h6>
          <h4 className='mt-4' style={{color: "#88106f"}}>Terms and conditions: </h4>
          <h6><ul className='pl-3'>{newTerms?.map((fields, index )=> {
          return <li key={index}>{fields + "."}</li>
        })}</ul></h6>
        </div>
       <div className='col-lg-6'>
          <h4 className='mt-4 mb-4' style={{color: "#88106f"}}>Ticket Info </h4>
          {ticketConfig?.[0] ? <div>
            <table className="table table-hover">
                <tbody>
                  {ticketConfig?.map((identity, fields)=>{
                      return <QuantityFields identity={identity} key={fields} index={fields}></QuantityFields>
                    })}
                </tbody>
              </table>
            {sum !== 0 && <h5 className='w-100 d-flex justify-content-center p-2 align-items-center' style={{border: "1px solid black", borderRadius: "10px"}}>Checkout: ₹{sum} </h5>}
            <button className='btn btn-primary mb-2 w-100' type="submit" onClick={()=>{sessionStorage.token ? submitinter() : setShow(true)}}>
              {!isLoading && (<span>{sessionStorage.token ? "Continue" : "Log In/Sign Up to Continue"}</span>)}
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              </button>
          </div> : <div><h5>Ticketing info doesnt exist</h5><p style={{color: "#6a6868"}}>Be the first to report the error and get some perks</p></div>}
        </div>
      </div>
    </div>
  )
}
