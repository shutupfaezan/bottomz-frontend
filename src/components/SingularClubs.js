import React, { useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
import HPEvents from './HPEvents';
import axios from 'axios'
import {SingularContext} from '../contexts/Context';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import { Tabs, Tab } from "baseui/tabs-motion";
import Gallery from "react-photo-gallery";
import MobileSingleClub from './MobileSingleClub';

export default function SingularClubs() {
const [activeKey, setActiveKey] = React.useState(0)

    const {clubVariable, setClubVariable} = useContext(SingularContext);
    const params = useParams()
    const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
    
    useEffect(() => {
        club()
        .then((response) => {
          // console.log(response)
            setClubVariable(response?.data[0])
        })
        .catch((error) => {
            console.log(error);
        });
        //eslint-disable-next-line
    }, []);

    const photos = [
      {
        src: clubVariable?.image_url?.[4],
        width: 1,
        height: 1
      },
      {
        src: clubVariable?.image_url?.[3],
        width: 2,
        height: 1
      },
      {
        src: clubVariable?.image_url?.[2],
        width: 2,
        height: 1
      },
      {
        src: clubVariable?.image_url?.[1],
        width: 1,
        height: 1
      },
    ];
  return (
    <>
    <BrowserView>
    <Gallery photos={photos} />
    <div className='col-md-6 p-2 ml-1'>
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
      <Tabs activeKey={activeKey} onChange={({ activeKey }) => { setActiveKey(activeKey); }} activateOnFocus>
        <Tab title="Events">
            <div className=''>
                <div className='d-flex d-md-block flex-column align-items-center'>{clubVariable?.Event_info?.map((fields, index )=> {
                    return <HPEvents className="col shadow-lg" key={index} identity={fields}></HPEvents>
                })}
                </div>
            </div>
        </Tab>
        <Tab title="Photos">
            <div className='w-100 d-flex flex-wrap'>{clubVariable?.image_url?.map((fields, index )=> {
                return <img className='position-relative m-1' style={{width: "165px", height: "165px"}} alt="" src={fields}></img>
            })}
            </div>
        </Tab>
        <Tab title="Menu">
            <div className='w-100 d-flex flex-wrap'>{clubVariable?.menu_images_url?.map((fields, index )=> {
                return <img className='position-relative m-2' style={{width: "160px", height: "160px"}} alt="" src={fields}></img>
            })}
            </div>
        </Tab>
      </Tabs>
    </div>
    </BrowserView>
    <MobileOnlyView>
      <MobileSingleClub/>
    </MobileOnlyView>
    </> 
  )
}
