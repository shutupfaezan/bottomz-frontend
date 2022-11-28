import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect';

export default function RenderEvents(props) {
  return (
  <div class="d-flex mt-3 w-100 shadow" style={{width: "24rem", border: "1px solid rgba(0,0,0,.125)", borderRadius: "20px"}}>
    <img class="p-2 align-self-center" style={{ minWidth: "100px", minHeight: "100px", maxHeight: "200px", maxWidth: "175px", borderRadius: "20px"}} src="https://tse4.mm.bing.net/th?id=OIP.psvuzkUEESk_cSorKC8YJgHaEK&pid=Api&P=0" alt="Club"/>
    <div class="d-flex flex-column justify-content-center">
      <BrowserView>
        <h3 class="m-0 pt-2"><strong>{props.identity.event_name}</strong></h3>
        <p className='m-0' style={{fontSize: "14px", color: "grey"}}>{props.identity.timings}</p>
        <p className='m-0' style={{fontSize: "13px", color: "grey"}}>{props.identity.event_venue}</p>
        <p className='m-0' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
      </BrowserView>
      <MobileView>
        <h6 class="m-0"><strong>{props.identity.event_name}</strong></h6>
        <p className='m-0' style={{fontSize: "14px", color: "grey"}}>{props.identity.timings}</p>
        <p className='m-0 text-truncate' style={{fontSize: "13px", color: "grey", width: "166px"}}>{props.identity.event_venue}</p>
        <p className='m-0' style={{fontSize: "13px", color: "grey"}}><strong>{props.identity.price}</strong></p>
      </MobileView>
    </div>
    <div className="ml-auto align-self-center p-2 mr-3" style={{border: "1px solid rgba(0,0,0,.125)", height: "73px", borderRadius: "8px", width: "52px", background: "#f4f3f7"}}>
      <p className="m-0 " style={{fontSize: "20px"}}>{props.identity.date.slice(0,4)}</p>
      <p style={{fontSize: "20px", marginLeft: "5px"}}>{props.identity.date.slice(4,10)}</p>
    </div>
  </div>
  )
}
