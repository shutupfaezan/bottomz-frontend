import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MobileOnlyView, TabletView, BrowserView } from 'react-device-detect'

export default function RenderClubs(props) {
  const navigate = useNavigate()
  return (
  <>
     <div className='p-2 m-md-0 col-lg-3 col-xxl-2 col-md-6 m-lg-0' onClick={()=>{navigate(props.identity.club_name)}}>
    <div className="card p-2 w-100 shadow cursor-pointer" style={{ borderRadius: "10px", border: "0px solid black"}}>
      <BrowserView>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "15px", height: "200px"}} alt="..."/>
      </BrowserView>
      <TabletView>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "15px", height: "200px"}} alt="..."/>
      </TabletView>
      <MobileOnlyView>
      <img src={props.identity.images_url}  className="card-img-top p-2" style={{borderRadius: "15px", height: "200px"}} alt="..."/>
      </MobileOnlyView>
      <div className="px-2 mb-3">
        <div className='d-flex justify-content-between'>
          <b className="card-title text-truncate m-0" style={{fontWeight: "700", fontSize: "22px"}}>{props.identity.club_name}</b>
        <div className="mt-1 d-flex align-items-center"><i className="bi bi-star-fill mr-1" style={{fontSize: "13px", color: "#ffbe5b"}}></i>{props.identity.rating}</div>
        </div>
        <p className='m-0' style={{fontSize: "14px", fontWeight: "400"}}><i className="bi bi-geo mr-2"></i>{props.identity.area}</p>
        <div className='d-flex justify-content-between'>
          <p className='m-0' style={{fontSize: "14px", fontWeight: "400"}}><i className="bi bi-clock mr-2"></i>{props.identity.opening_time}</p>
          <p className='m-0' style={{fontSize: "14px", fontWeight: "400"}}><i className="bi bi-currency-rupee"></i>{props.identity.cost}</p>
          </div>
      </div>
    </div>
  </div>
  </>
  )
}
