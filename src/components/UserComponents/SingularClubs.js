import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import GlobalHeader from '../../common/GlobalHeader';
import { useState } from 'react';
import { BrowserView,  MobileView, TabletView } from 'react-device-detect';
import Footer from "../../common/Footer"
import ClubModal from '../../common/ClubModal';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';
import "../../css/SingularClubs.css"

export default function SingularClubs() {
  const {setClubsModal} = useContext(SingularContext);
  const [clubVariable, setClubVariable] = useState();
  const [imageType, setImageType] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
  const navigate = useNavigate()
  useEffect(() => {
    club()
    .then((response) => {
      setClubVariable(response?.data[0])
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
    //eslint-disable-next-line
  }, []);
  
function modalOpener(type){
  setImageType(type)
  setClubsModal(true)
}


  return (
       <>
    <div className='position-relative'>
    {isLoading && <div className='d-flex justify-content-center mt-auto' style={{height: "100vh"}}>
          <div className='d-flex align-items-center'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px"}} alt=""/></span>
          </div>
          </div>}
   {!isLoading && <>
    <GlobalHeader/>
   <div className='p-md-5 p-4 d-flex club-header' style={{height: "100%", background: "black", color: "white"}}>
      <div className='m-lg-5 m-md-4 col-lg-6 col-md-8 p-0'>
        <BrowserView>
          <h1 className='' style={{fontSize: "2.5rem"}}><b>{clubVariable?.Club_info?.club_name}</b></h1>
        </BrowserView>
        <TabletView>
          <h1 className='' style={{fontSize: "2.5rem"}}><b>{clubVariable?.Club_info?.club_name}</b></h1>
        </TabletView>
        <MobileView>
          <h1 className='mb-3' style={{fontSize: "2.0rem"}}><b>{clubVariable?.Club_info?.club_name}</b></h1>
        </MobileView>
        <h6 className='d-flex club-info' style={{fontWeight: "500"}}><i className="fa-solid fa-location-arrow mr-2"></i><div style={{fontWeight: "500"}}>{clubVariable?.Club_info?.full_address}</div></h6>
        <h6 className='club-info'><i className="fa-regular fa-calendar mr-2"></i>Opens at {clubVariable?.Club_info?.opening_time}<b></b></h6>
      </div>
      <div className="ml-auto mt-md-3 mt-md-5 mt-2 pr-md-5">
        <a href={clubVariable?.Club_info?.direction} target='_blank' rel="noreferrer" className='info-link mt-4' 
        >
          <i class="fa-regular fa-paper-plane" 
            style={{fontSize: "20px", transform: 'translateX(-10%)'}}
          ></i>
          <div className='direction-label' style={{fontWeight: '500'}}>Directions</div>
        </a>
      </div>
    </div>
    <div className='px-lg-5 px-md-4 d-flex flex-column flex-md-row pt-4'>
      <div className='changeHeightComponent col-md-6 col-lg-4 col p-md-0'>
      <img style={{width: "100%", height:"auto", aspectRatio: "1/1",objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[0]} alt=""></img>
      <p className="px-3 py-2 rounded-pill" onClick={() => modalOpener("club")} style={{position: "absolute", bottom: "0px", left: "30px", background: "white", fontSize: "14px"}}><i class="fa-regular fa-image mr-2"></i>Show all photos</p>
      </div>
      <div className='col-md-6 col-lg-4 col d-flex flex-wrap px-3 pb-3 pt-2 p-md-0'>
        <img className="col-6 pl-md-2 p-0 pr-0 pb-2" style={{width: "100%", height:"auto", aspectRatio: "1/1", objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[4]} alt=""></img>
        <img className="col-6 pl-2 pr-0 pb-2" style={{width: "100%", height:"auto", aspectRatio: "1/1", objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[1]} alt=""></img>
        <img className="col-6 pl-md-2 p-0 pr-0 " style={{width: "100%", height:"auto", aspectRatio: "1/1", objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[2]} alt=""></img>
        <img className="col-6 pl-2 pr-0" style={{width: "100%", height:"auto", aspectRatio: "1/1", objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[3]} alt=""></img>
      </div>
      <div className='d-lg-block d-none col-md-6 col-lg-4 col p-md-0 pl-md-2'>
      <img style={{width: "100%", height:"auto", aspectRatio: "1/1",objectFit: "cover", borderRadius: "20px"}} src={clubVariable?.image_url?.[5]} alt=""></img>
      </div>
      <ClubModal items={clubVariable} type={imageType}/>
    </div>
    <div className='px-lg-5 px-md-2 d-flex flex-column flex-md-row mb-5'>
      <div className='col-lg-7 col-md-6 p-0 px-3'>
      <p className='px-2 py-3 mb-0 py-md-4 py-md-0 px-md-2'>Upcoming Events</p>
        { clubVariable?.Event_info?.length > 0 ? clubVariable?.Event_info?.map((fields, index )=>{
              return (
                <div className='col py-md-4 w-100 p-0' key={index} onClick={()=>navigate("/all-events/" + fields.event_name)}>
                <div className='p-md-3 p-3 w-100 d-flex' style={{borderRadius: "10px", border: "2px solid black", boxShadow: "7px 7px #E8EBEE"}}>
                  <img className="col-3 w-100 p-0" style={{height: "100px", borderRadius: "7px"}} alt="" src={fields.images_url}/> 
                  <div className='overflow-auto col'>
                    <div  className='text-truncate overflow-hidden'><b>{fields.event_name}</b></div>
                    <div className='d-flex mt-1 overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.event_venue}</div></div>
                    <div className='d-flex mt-1'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.timings} • {fields.date}</div></div>
                    <div className='d-flex mt-1 align-items-center'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{fields.price_range}</div></div>
                  </div>
                </div>
              </div>
              )
          }) : 
          <div className='col py-md-4 py-4 w-100 p-0 px-2' style={{background: "#F4F5F6", borderRadius: "10px"}}>
                No events yet...try back after sometime?🥺
          </div>}
      </div>
      <div className='col-lg-5 col-md-6'>
      <p className='px-2 py-3 mb-0 py-md-4'>Menu</p>
      <div className='p-2 mb-0 p-md-3 d-flex flex-wrap' style={{border: "2px solid black", borderRadius: "10px"}}>
      {clubVariable?.menu_images_url?.map((fields, index )=>{
              return (
              <div className='col-md-4 col-4 p-1' key={index}>
                    <img src={fields} alt="" onClick={() => modalOpener("menu")} style={{width: "100%", height: "110px", borderRadius: "5px"}}></img>
                  </div>
              )
          })}
          </div>
      </div>
    </div>
    <Footer/>
    </>}
    </div>
    </> 
  )
}
