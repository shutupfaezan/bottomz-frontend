import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Tabs, Tab } from "baseui/tabs-motion";
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import HPEvents from './HPEvents';
import Gallery from "react-photo-gallery";

export default function SingularClubs() {
const [activeKey, setActiveKey] = React.useState(0)
const [clubVariable, setClubVariable] = useState()
const [eventsVariable, setEventVariable] = useState()
const [totalPhotos, setTotalPhotos] = useState()
const [menuPhotos, setMenuPhotos] = useState()
    const params = useParams()
    const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
    
    useEffect(() => {
        club()
        .then((response) => {
          console.log(response)
            setClubVariable(response?.data[0])
            setEventVariable(response?.data[0].Event_info)
            setTotalPhotos(response?.data[0].image_url)
            setMenuPhotos(response?.data[0].menu_images_url)
        })
        .catch((error) => {
            console.log(error);
        });
        //eslint-disable-next-line
    }, []);

    const photos = [
      {
        src: totalPhotos?.[4],
        width: 1,
        height: 1
      },
      {
        src: totalPhotos?.[3],
        width: 2,
        height: 1
      },
      {
        src: totalPhotos?.[2],
        width: 2,
        height: 1
      },
      {
        src: totalPhotos?.[1],
        width: 1,
        height: 1
      },
      // {
      //   src: totalPhotos?.[0],
      //   width: 1,
      //   height: .5
      // }
    ];
  return (
    <>
    <BrowserView>
    <Gallery photos={photos} />;
    
    </BrowserView>
    <MobileOnlyView>
      <div>
      <Carousel showThumbs={false}>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src={totalPhotos?.[0]} alt=''/>
        </div>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src={totalPhotos?.[1]} alt=''/>
        </div>
        <div style={{height: "100%"}}>
          <img className="w-100" style={{height: "100%"}} src={totalPhotos?.[4]} alt=''/>
        </div>
      </Carousel>
      </div>
      <div className='p-2 ml-1'>
       <div className='d-flex align-items-center'>
      <h1><strong>{clubVariable?.Club_info?.club_name}</strong></h1>
      <i className="bi bi-heart mr-3 ml-auto" style={{fontSize: "25px", color: "warning"}}></i>
      </div>
      <div className='d-flex'>
      <i class="bi bi-geo-alt mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%", margin: "0"}}>{clubVariable?.Club_info?.full_address}</p>
      </div>
      <div className='d-flex'>
      <i class="bi bi-clock mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%"}}>Opens at:   {clubVariable?.Club_info?.opening_time}</p>
      </div>
      </div>
      <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }} activateOnFocus>
      <Tab title="Events">
        <div className=''>
          <div className='d-flex d-md-block flex-column align-items-center'>{eventsVariable?.map((fields, index )=> {
            return <HPEvents className="col shadow-lg" key={index} identity={fields}></HPEvents>
          })}
          </div>
      </div>
      </Tab>
      <Tab title="Photos"><div className='w-100 d-flex flex-wrap'>{totalPhotos?.map((fields, index )=> {
          return <img className='position-relative m-2' style={{width: "160px", height: "160px"}} src={fields}></img>
        })}</div>
      </Tab>
      <Tab title="Menu"><div className='w-100 d-flex flex-wrap'>{menuPhotos?.map((fields, index )=> {
          return <img className='position-relative m-2' style={{width: "160px", height: "160px"}} src={fields}></img>
        })}</div>
      </Tab>
    </Tabs>
     
    </MobileOnlyView>
    </> 
  )
}
