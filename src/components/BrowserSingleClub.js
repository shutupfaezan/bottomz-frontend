import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { Tabs, Tab } from "baseui/tabs-motion";
import HPEvents from './HPEvents';
import Gallery from "react-photo-gallery";

export default function BrowserSingleClub() {
    const [activeKey, setActiveKey] = React.useState(0)
    const {clubVariable} = useContext(SingularContext);
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
    <Gallery photos={photos} />
    <div className='d-flex'>
        <div className='col-md-6 p-2 mb-2'>
            <div className='d-flex align-items-center'>
                <h1><strong>{clubVariable?.Club_info?.club_name}</strong></h1>
                <i className="bi bi-heart mr-3 ml-auto" style={{fontSize: "25px", color: "warning"}}></i>
            </div>
            <div className='d-flex'>
                <i className="bi bi-geo-alt mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%", margin: "0"}}>{clubVariable?.Club_info?.full_address}</p>
            </div>
            <div className='d-flex'>
                <i className="bi bi-clock mr-2" style={{fontSize: "18px"}}></i><p style={{color: "gray", width: "65%"}}>Opens at:   {clubVariable?.Club_info?.opening_time}</p>
            </div>
            <Tabs activeKey={activeKey} onChange={({ activeKey }) => { setActiveKey(activeKey); }} activateOnFocus>
                <Tab title="Events">
                <div className='d-flex d-md-block flex-column align-items-center'>{clubVariable?.Event_info?.map((fields, index )=> {
                return <HPEvents className="col shadow-lg" key={index} identity={fields}></HPEvents>
                })}
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
        <div className='col-md-6 mt-2'>
            <h2 className='mb-5'>Directions</h2>
        </div>
    </div>
    </>
  )
}
