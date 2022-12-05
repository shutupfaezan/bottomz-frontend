import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect';

export default function RenderEvents(props) {
  return (
    <>
      <BrowserView >
        <div class="d-flex flex-column mt-3" style={{width: "170px"}}>
          <div>
            <img class="p-2 align-self-center" style={{ width: "170px", height: "220px", borderRadius: "20px"}} src="https://tse3.mm.bing.net/th?id=OIP.g-CHSQ0C-ZiK_3zZ2MUWQgHaK4&pid=Api&P=0" alt="Club"/>
              <div className='d-flex justify-content-center flex-column'> 
                <h6 class="m-0 d-flex justify-content-center "><strong>{props.identity.event_name}</strong></h6>
                <p className='m-0 align-self-center text-truncate' style={{fontSize: "13px", color: "grey", width: "60%"}}>{props.identity.event_venue}</p>
                <p className='m-0 d-flex justify-content-center' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
              </div>
          </div>
        </div>
      </BrowserView>
      <MobileView >
        <div class="d-flex flex-column mt-3" style={{width: "170px"}}>
            <div>
              <img class="p-2 align-self-center" style={{ width: "170px", height: "220px", borderRadius: "20px"}} src="https://tse3.mm.bing.net/th?id=OIP.g-CHSQ0C-ZiK_3zZ2MUWQgHaK4&pid=Api&P=0" alt="Club"/>
              <div className='d-flex justify-content-center flex-column'>
                <h6 class="m-0 d-flex justify-content-center "><strong>{props.identity.event_name}</strong></h6>
                <p className='m-0 align-self-center text-truncate' style={{fontSize: "13px", color: "grey", width: "60%"}}>{props.identity.event_venue}</p>
                <p className='m-0 d-flex justify-content-center' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
              </div>
            </div>
          </div>
      </MobileView>
  </>
  )
}
