import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BrowserView, TabletView, MobileOnlyView} from 'react-device-detect';

export default function RenderEvents(props) {
  const navigate = useNavigate()
  return (
    <>
      <BrowserView className='w-100'>
      <div className="d-flex w-100">
        <img className="align-self-center mr-2" style={{width: "70px", height: "54px"}} src={props.identity.images_url} alt="Club"/>
        <div style={{width: "180px"}} className="mx-2">
        <p className="m-0 mr-2" style={{color: "#980098", fontSize: "17px"}}><strong>{props.identity.date}</strong></p>
        <p className="m-0" style={{color: "gray"}}>{props.identity.day.slice(0,3)} • {props.identity.timings}</p>
        </div>
        <div className="d-flex flex-column">
          <div className='d-flex'>
          </div>
          <p className="m-0"><strong>{props.identity.event_name}</strong></p>
          <p className='m-0' style={{fontSize: "14px", color: "grey"}}>{props.identity.event_venue}</p>
        </div>
        <div className='d-flex ml-auto'>
          <button className="btn btn-primary" style={{height: "45px"}} onClick={()=>{navigate(props.identity.event_name)}}>See tickets</button>
          <i className="bi bi-three-dots-vertical" style={{fontSize: "30px", color: "gray"}}></i></div>
      </div>
          <hr className="w-100" style={{height: "0.1px"}}/>
      </BrowserView>
      <TabletView className='w-100'>
      <div className="d-flex w-100">
        <img className="align-self-center mr-2" style={{width: "70px", height: "54px"}} src={props.identity.images_url} alt="Club"/>
        <div style={{width: "180px"}} className="mx-2">
        <p className="m-0 mr-2" style={{color: "#980098", fontSize: "17px"}}><strong>{props.identity.date}</strong></p>
        <p className="m-0" style={{color: "gray"}}>{props.identity.day.slice(0,3)} • {props.identity.timings}</p>
        </div>
        <div className="d-flex flex-column">
          <div className='d-flex'>
          </div>
          <p className="m-0"><strong>{props.identity.event_name}</strong></p>
          <p className='m-0' style={{fontSize: "14px", color: "grey"}}>{props.identity.event_venue}</p>
        </div>
        <div className='d-flex ml-auto'><i className="bi bi-three-dots-vertical" style={{fontSize: "30px", color: "gray"}}></i></div>
      </div>
          <hr className="w-100" style={{height: "0.1px"}}/>
      </TabletView>
      <MobileOnlyView className='w-100'>
        <div className="d-flex w-100" style={{width: "24rem"}}>
          <img className="align-self-center mr-2" style={{width: "70px", height: "70px", borderRadius: "14px"}} src={props.identity.images_url} alt="Club"/>
          <div className="d-flex flex-column">
            <div className='d-flex'>
              <p className="m-0 mr-2" style={{color: "#980098"}}><strong>{props.identity.date}</strong></p>
              <p className="m-0" style={{color: "gray"}}>{props.identity.day.slice(0,3)} • {props.identity.timings}</p>
            </div>
            <p className="m-0"><strong>{props.identity.event_name}</strong></p>
            <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{props.identity.event_venue}</p>
          </div>
          <div className='d-flex ml-auto'><i className="bi bi-three-dots-vertical" style={{fontSize: "30px", color: "gray"}}></i></div>
          </div>
          <hr className="w-100" style={{height: "0.1px"}}/>
      </MobileOnlyView>
  </>
  )
}
