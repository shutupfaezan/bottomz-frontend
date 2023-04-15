import React, { useEffect, useContext} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Footer from "../../common/Footer"
import {SingularContext} from '../../contexts/Context';
import GlobalHeader from '../../common/GlobalHeader';
import { useState } from 'react';

export default function SingularClubs() {
  const {setClubVariable, clubVariable} = useContext(SingularContext);
  const params = useParams()
  const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
  const [activeTab, setActiveTab] = useState(1)
  useEffect(() => {
    club()
    .then((response) => {
      console.log(response)
      setClubVariable(response?.data[0])
    })
    .catch((error) => {
      console.log(error);
    });
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate()
  return (
       <>
    <div className='position-relative'>
    <GlobalHeader/>
    <div className="" style={{height: "100px", position: "relative", background: `url(${clubVariable?.Club_info?.images_url}) center/cover no-repeat`, filter: "blur(3px)"}}></div>
    <div className='d-flex justify-content-center w-100' style={{top: "-70px", height: "100%", position: "relative"}}>
    <div className='col-lg-6 col-md-8 p-2 w-100'>
        <div className='p-md-3 p-3 w-100 d-flex shadow-sm' style={{borderRadius: "10px", background: "white", border: "2px solid black"}}>
          <img className="col-3 w-100 p-0" style={{height: "90px", borderRadius: "7px"}} alt="" src={clubVariable?.Club_info?.images_url}/> 
          <div className='overflow-auto col'>
            <div  className='text-truncate overflow-hidden'><b>{clubVariable?.Club_info?.club_name}</b></div>
            <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubVariable?.Club_info?.full_address}</div></div>
            <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubVariable?.Club_info?.opening_time}</div></div>
            <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubVariable?.Club_info?.cost}</div></div>
            <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{clubVariable?.Club_info?.contact}</div></div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-2'>
          <div className='m-2 d-flex justify-content-center align-items-center' onClick={()=>setActiveTab(1)} style={{height: "75px", width: "100px", border: "2px solid black", borderRadius: "10px", background: activeTab === 1 ? "black" : "white", color: activeTab === 1 ? "white" : "black"}}>Events</div>
          <div className='m-2 d-flex justify-content-center align-items-center' onClick={()=>setActiveTab(2)} style={{height: "75px", width: "100px", border: "2px solid black", borderRadius: "10px", background: activeTab === 2 ? "black" : "white", color: activeTab === 2 ? "white" : "black"}}>Photos</div>
          <div className='m-2 d-flex justify-content-center align-items-center' onClick={()=>setActiveTab(3)} style={{height: "75px", width: "100px", border: "2px solid black", borderRadius: "10px", background: activeTab === 3 ? "black" : "white", color: activeTab === 3 ? "white" : "black"}}>Menu</div>
        </div>
        <div className='d-flex'>
        {activeTab === 1 && <div className='d-lg-flex justify-content-center w-100 flex-wrap mt-3'>
        <p className='w-100 d-flex justify-content-center'>Upcoming Events</p> 
        {clubVariable && clubVariable?.Event_info?.map((fields, index )=> {
                return (
                  <div className='col-lg-10 col p-2 w-100' key={index} onClick={()=>{navigate(`/all-events/` + fields.event_name)}}>
                    <div className='p-md-3 p-3 w-100 d-flex shadow' style={{borderRadius: "10px"}}>
                      <img className="col-3 w-100 p-0" style={{height: "80px", borderRadius: "7px"}} alt="" src={fields.images_url}/> 
                      <div className='overflow-auto col'>
                        <div  className='text-truncate overflow-hidden'><b>{fields.event_name}</b></div>
                        <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.event_venue}</div></div>
                        <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.timings} • {fields.date}</div></div>
                        <div className='d-flex align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.price_range}</div></div>
                      </div>
                    </div>
                  </div>
                )
                })}
            </div>}
            {activeTab === 2 && <div className='mt-3 d-flex justify-content-center flex-wrap'>
              <p className='w-100 d-flex justify-content-center'>Club Photos</p>
              <div className='d-flex flex-wrap'>
               {clubVariable && clubVariable?.image_url?.map((fields, index )=> {
                return (
                  <>
                  <div className='col-md-3 col-4 p-1'>
                    <img src={fields} alt="" style={{width: "100%", height: "100px", borderRadius: "5px"}}></img>
                  </div>
                  </>
                )
                })}
                </div>
            </div>}
            {activeTab === 3 && <div className='mt-3 d-flex justify-content-center flex-wrap'>
              <p className='w-100 d-flex justify-content-center'>Menu Photos</p>
              <div className='d-flex flex-wrap'>
               {clubVariable && clubVariable?.menu_images_url?.map((fields, index )=> {
                return (
                  <>
                  <div className='col-md-3 col-4 p-1'>
                    <img src={fields} alt="" style={{width: "100%", height: "110px", borderRadius: "5px"}}></img>
                  </div>
                  </>
                )
                })}
                </div>
            </div>}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    </> 
  )
}
