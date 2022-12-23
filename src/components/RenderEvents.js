import React, {useContext} from 'react'
import axios from 'axios'
import { SingularContext } from "../contexts/Context";
import { BrowserView, TabletView, MobileOnlyView} from 'react-device-detect';
import { useNavigate } from 'react-router-dom'

export default function RenderEvents(props) {
  const {setHitRun, setRunInfo} = useContext(SingularContext);
  const navigate = useNavigate()

  function singularEvent(){
    axios.get(`https://nightlife-2710.herokuapp.com/fetch-single-event?event_name=${props?.identity.event_name}`)
    .then((response)=>
      setRunInfo(response.data),
    )     
  }
 
  return (
    <>
      <BrowserView className='w-100'>
      <div className="d-flex w-100">
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
      </BrowserView>
      <TabletView className='w-100'>
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
