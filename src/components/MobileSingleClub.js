import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { Tabs, Tab } from "baseui/tabs-motion";
import HPEvents from './HPEvents';
import { Carousel } from 'react-responsive-carousel';

export default function MobileSingleClub() {
const [activeKey, setActiveKey] = React.useState(0)
const {clubVariable} = useContext(SingularContext);
  return (
      <>
      <div>
        <Carousel showThumbs={false} >
            <div style={{height: "100%"}}>
                <img className="w-100" style={{height: "100%"}} src={clubVariable?.image_url?.[0]} alt=''/>
            </div>
            <div style={{height: "100%"}}>
                <img className="w-100" style={{height: "100%"}} src={clubVariable?.image_url?.[1]} alt=''/>
            </div>
            <div style={{height: "100%"}}>
                <img className="w-100" style={{height: "100%"}} src={clubVariable?.image_url?.[4]} alt=''/>
            </div>
        </Carousel>
      </div>
      <div className='p-2 ml-1'>
        <div className='d-flex align-items-center'>
            <h2><strong>{clubVariable?.Club_info?.club_name}</strong></h2>
            <i className="bi bi-heart mr-3 ml-auto" style={{fontSize: "25px", color: "warning"}}></i>
        </div>
        <div className='d-flex'>
            <i class="bi bi-geo-alt mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%", margin: "0"}}>{clubVariable?.Club_info?.full_address}</p>
        </div>
        <div className='d-flex'>
            <i class="bi bi-clock mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%"}}>Opens at:   {clubVariable?.Club_info?.opening_time}</p>
        </div>
      </div>
      <Tabs activeKey={activeKey} onChange={({ activeKey }) => {setActiveKey(activeKey);}} activateOnFocus>
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
                return <img className='position-relative m-1' style={{width: "110px", height: "110px"}} src={fields} alt=""></img>
            })}
            </div>
        </Tab>
        <Tab title="Menu">
            <div className='w-100 d-flex flex-wrap'>{clubVariable?.menu_images_url?.map((fields, index )=> {
                return <img className='position-relative m-2' style={{width: "100px", height: "100px"}} src={fields} alt=""></img>
            })}
            </div>
        </Tab>
    </Tabs>
    </>
  )
}
