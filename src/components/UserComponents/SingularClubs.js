import React, { useEffect } from 'react'
import * as changeCase from "change-case";
import { useParams } from "react-router-dom";
import axios from 'axios'
import GlobalHeader from '../../common/GlobalHeader';
import { useState } from 'react';
import HPEvents from "../LandingComponents/HPEvents"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import  Breadcrumb  from '../../extra/Breadcrumb';
import "../../css/SingularClubs.css"
import "../../css/Header.css"

export default function SingularClubs() {
  const [clubVariable, setClubVariable] = useState();
  const params = useParams()
  // console.log(params.name)
  
  const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${changeCase.capitalCase(params.name)}`)}
  useEffect(() => {
    club()
    .then((response) => {
      setClubVariable(response?.data[0])
    })
    .catch((error) => {
      console.log(error);
    });
    //eslint-disable-next-line
  }, []);

  const singularClubSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // Add any other settings you might need
  };
  

  console.log(clubVariable?.menu_images_url)

  return (
       <>
    <div className='position-relative'>
      <GlobalHeader/>
      <div className='postion-relative'>
        <div className='py-md-5 d-flex flex-column d-flex club-header position-relative background-with-gradient' style={{height: "100%", color: "white", backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${clubVariable?.Club_info?.images_url})`}}>
          <div className='' style={{position: "absolute", top: "0px", height: "100%", width: "100%", backdropFilter: "blur(10px)"}}></div>
          <div style={{paddingTop: "70px", zIndex: "2"}}>
            <Breadcrumb/>
          </div>
            <div className='pb-5 col-lg-6 col-md-8 col-9 p-0 d-flex flex-column text-center mx-auto'>
              <h1 className='headerFont' style={{fontSize: "2.5rem"}}><b>{clubVariable?.Club_info?.club_name}</b></h1>
              <div className='d-flex flex-column p-3 mb-3' style={{border: "0.5px solid white", gap: "8px", borderRadius: "20px", backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.1)"}}>
                <h6 className='club-info' style={{fontWeight: "400"}}><i className="fa-solid fa-calendar-days mr-2"></i>Opens at {clubVariable?.Club_info?.opening_time}<b></b></h6>
                <h6 className='d-flex club-info mx-auto' style={{fontWeight: "400"}}><i className="fa-solid fa-location-dot mr-2"></i><div style={{fontWeight: "500"}}>{clubVariable?.Club_info?.full_address}</div></h6>
                <button onClick={()=>{window.location.href = clubVariable?.Club_info?.direction}} className='btn col-lg-3 mx-auto' style={{border: "1.5px solid white", borderRadius: "60px", color: "white"}}>
                  <div style={{fontWeight: "500"}}><p className='mb-0 p-2' style={{fontWeight: "600", fontSize: "12px"}}>Direction<i className="fa-solid fa-arrow-right ml-2"></i></p></div>
                </button>
              </div>
            </div>
        </div>
      </div>
      <div className='d-flex justify-content-center position-relative' style={{top: "-70px"}}>
       {clubVariable?.image_url?.slice(0,5)?.map((image, index)=>{
        return(
        <div className='col-lg-2 px-2'>
         <img style={{width: "100%", height: "225px", objectFit: "cover", borderRadius: "10px", border: "2px solid white"}} src={image} alt=""  data-bs-toggle="modal" data-bs-target="#staticBackdrop"></img>
        </div>
       )})}
      {/* Modal for Club Images*/}
      <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog" style={{maxWidth: "700px"}}>
          <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close" style={{position: "relative", left: "655px", color: "white"}}><i class="bi bi-x-lg"></i></button>
          <div className="modal-content" style={{background: "none", border: "none"}}>
            <div className="modal-body" style={{padding: "0px"}}>
              <Slider {...singularClubSliderSettings}>
                {clubVariable?.image_url?.map((image, index) => (
                  <div key={index} style={{width: "700px"}}>
                    <img src={image} alt={`Slide ${index}`} style={{ width: '700px', height: "400px", border: "2px solid white", borderRadius: "20px", objectFit: 'cover'}} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className='px-lg-3 px-md-5 px-md-2 d-flex flex-column mb-5'>
        <div className='col-lg-12 p-0 px-3 d-flex flex-column position-relative'>
          <img style={{position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)"}} src={process.env.PUBLIC_URL + "/images/singularclubpagevectorright.png"} alt=""></img>
          <img style={{position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)"}} src={process.env.PUBLIC_URL + "/images/singularclubpagevectorleft.png"} alt=""></img>
          <h3 className='px-2 py-3 mb-0 py-md-4 py-md-0 px-md-2 headerFont mx-auto' style={{color: "black", fontWeight: "800"}}>Upcoming Events</h3>
        </div>
        <div  className='d-flex flex-md-wrap align-items-center px-md-5 p-2 overflow-scroll overflow-md-hidden ml-4 ml-md-0'>
          {clubVariable && clubVariable?.Event_info?.map((fields, index)=>{
            return<>
              <div className='col-lg-3 col-md-6 col-10 p-1 px-1 w-100 my-1'><HPEvents key={index} index={index} identity={fields}></HPEvents></div>
            </>
          })}
        </div>
      </div>
      <div className='px-lg-5 px-md-2 d-flex flex-column mb-5'>
        <div className='col-lg-12 p-0 px-3 mb-3 d-flex position-relative'>
          <img style={{position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)"}} src={process.env.PUBLIC_URL + "/images/singularclubpagevectorright.png"} alt=""></img>
          <img style={{position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)"}} src={process.env.PUBLIC_URL + "/images/singularclubpagevectorleft.png"} alt=""></img>
          <h3 className='px-2 py-3 mb-0 py-md-4 py-md-0 px-md-2 headerFont mx-auto' style={{color: "black", fontWeight: "800"}}>Club Menu</h3>
        </div>
        <div className='d-flex py-3 justify-content-center' style={{background: "rgba(244, 244, 244, 1)", borderRadius: "10px", border: "1px solid black"}}>
          {clubVariable?.menu_images_url?.splice(0, 6).map((menu_image, index)=>{
            return(
              <>
                <div className='col-2 d-flex flex-column' key={index} style={{height: "100%"}}>
                  <div className='d-flex'>
                    <p className='mx-auto mb-2' style={{fontWeight: "800"}}>0{index + 1}</p>
                  </div>
                  <div className=''>
                    <img style={{width: "100%", height: "225px"}} src={menu_image}  data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt=""></img>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      {/* Modal for Menu Images*/}
      <div className="modal fade" id="staticBackdrop2" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog" style={{maxWidth: "300px", maxHeight: "450px"}}>
          <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close" style={{position: "relative", left: "280px", color: "white"}}><i class="bi bi-x-lg"></i></button>
          <div className="modal-content" style={{background: "none", border: "none"}}>
            <div className="modal-body" style={{padding: "0px"}}>
              <Slider {...singularClubSliderSettings}>
                {clubVariable?.menu_images_url?.map((image, index) => (
                  <div key={index} style={{width: "700px"}}>
                    <img src={image} alt={`Slide ${index}`} style={{ width: '300px', height: "450px", border: "2px solid white", borderRadius: "20px", objectFit: 'cover'}} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    </> 
  )
}
