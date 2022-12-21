import React, {useContext} from 'react'
import axios from 'axios'
import { SingularContext } from "../contexts/Context";
import { BrowserView, MobileView } from 'react-device-detect';
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
      <BrowserView>
        <div className="d-flex flex-column mt-3" style={{width: "170px"}} onClick={()=>{setHitRun(true);singularEvent()}}>
          <div>
            <img className="p-2 align-self-center" style={{ width: "170px", height: "220px", borderRadius: "20px"}} src={props.identity.images_url} alt="Club"/>
              <div className='d-flex justify-content-center flex-column'> 
                <h6 className="m-0 d-flex justify-content-center "><strong>{props.identity.event_name}</strong></h6>
                <p className='m-0 align-self-center text-truncate' style={{fontSize: "13px", color: "grey", width: "60%"}}>{props.identity.event_venue}</p>
                <p className='m-0 d-flex justify-content-center' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
              </div>
          </div>
        </div>
      </BrowserView>
      <MobileView >
        <div className="d-flex flex-column mt-3" style={{width: "170px"}}  onClick={()=>{navigate(`/all-events/${props.identity.event_name}`)}}>
            <div>
              <img className="p-2 align-self-center" style={{ width: "170px", height: "220px", borderRadius: "20px"}} src="https://tse3.mm.bing.net/th?id=OIP.g-CHSQ0C-ZiK_3zZ2MUWQgHaK4&pid=Api&P=0" alt="Club"/>
              <div className='d-flex justify-content-center flex-column'>
                <h6 className="m-0 d-flex justify-content-center "><strong>{props.identity.event_name}</strong></h6>
                <p className='m-0 align-self-center text-truncate' style={{fontSize: "13px", color: "grey", width: "60%"}}>{props.identity.event_venue}</p>
                <p className='m-0 d-flex justify-content-center' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
              </div>
            </div>
        </div>
      </MobileView>
  </>
  )
}
