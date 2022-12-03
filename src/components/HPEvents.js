import React from 'react'

export default function HPEvents(props) {
  return (
  <div class="d-flex mt-3 w-100" style={{width: "24rem", border: "1px solid rgba(0,0,0,.125)", borderRadius: "20px"}}>
    <img class="p-2 align-self-center" style={{width: "90px", height: "90px", borderRadius: "20px"}} src="https://tse4.mm.bing.net/th?id=OIP.psvuzkUEESk_cSorKC8YJgHaEK&pid=Api&P=0" alt="Club"/>
    <div class="d-flex flex-column">
      <h5 class="m-0 pt-2"><strong>{props.identity.event_name}</strong></h5>
      <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{props.identity.timings}</p>
      <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{props.identity.event_venue}</p>
      <p className='m-0' style={{fontSize: "12px", color: "grey"}}>{props.identity.price}</p>
    </div>
    <div className="ml-auto align-self-center p-2 mr-3" style={{border: "1px solid rgba(0,0,0,.125)", height: "73px", borderRadius: "16px", width: "52px", background: "#f4f3f7"}}>
      <p className="m-0" style={{fontSize: "20px"}}>{props.identity.date.slice(0,5)}</p>
      <p style={{fontSize: "20px"}}>{props.identity.date.slice(5,10)}</p>
    </div>
  </div>
  )
}
