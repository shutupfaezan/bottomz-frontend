import React from 'react'
import { BrowserView, MobileView} from 'react-device-detect' 
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const navigate = useNavigate()
  return (
    <>
    <BrowserView>
      <div className='w-100 d-flex justify-content-center'>
        <form className="d-flex align-items-center" style={{width: "75%"}} role="search" onClick={()=>navigate('/search')}>
          <input className="form-control w-100" type="search" style={{height: "60px",fontSize: "17px"}} placeholder="Search Any Event or Club..." aria-label="Search"/>
          <i className="bi bi-search d-none d-md-block ml-2" style={{fontSize: "30px", width: "0px", color: "white"}}></i> 
        </form> 
      </div>
    </BrowserView>
    <MobileView>
      <div className='w-100 d-flex justify-content-center'>
        <form className="d-flex align-items-center" style={{width: "90%"}} role="search">
          <input className="form-control w-100" type="search" style={{height: "60px",fontSize: "17px"}} placeholder="Search Any Event or Club..." aria-label="Search"/>
          <i className="bi bi-search d-none d-md-block ml-2" style={{fontSize: "30px", width: "0px", color: "white"}}></i> 
        </form> 
      </div>
    </MobileView>
      </>
  )
}
