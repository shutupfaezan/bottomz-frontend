import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from '../UserComponents/RenderClubs';
import "../../css/AllClubs.css"
import "../../css/ClubsRow.css"
import GlobalHeader from '../../common/GlobalHeader'
import Footer from '../../common/Footer';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';

export default function AllClubs() {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearhTerm] = useState()
    const [recentClubs, setRecentClubs] = useState()
    const clubList = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}

    useEffect(() => {
      clubList()
        .then((response) => {
          setRecentClubs(response)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <>
    <div>
    {loading && <div className='d-flex justify-content-center mt-auto'>
    <div className='d-flex align-items-center'>
    <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}}/></span>
    </div>
    </div>}
    {!loading && <>
      <GlobalHeader/>
      <div className='mb-5 mb-2 mb-md-3' style={{height: "300px", background: "black"}}>
<div className='d-flex justify-content-center align-items-center w-100 px-4 flex-column' style={{height: "100%"}}>
        <div className='d-flex justify-content-center px-5 mx-lg-4 mx-md-2'>
          <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
          <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Clubs</div>
        </div>
        <div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 mx-md-4" role="search">
            <input className="form-control py-4" type="search" style={{borderRadius: "20px", fontSize: "20px", border: "0.5px solid black", paddingLeft: "45px"}} onChange={(event)=>setSearhTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "10px", width: "0px", fontSize: "20px"}}></i>
          </form>
        </div>
</div>
</div>
  <div className={`d-flex px-2 flex-wrap m-xl-5 mb-3 mb-md-5`}>
    {/* eslint-disable-next-line */}
    {recentClubs?.data?.reverse().filter((val) => {
      return searchTerm === undefined || searchTerm === "" || val.club_name.toLowerCase().includes(searchTerm?.toLowerCase())
    }).map((fields, index) => {
      return <RenderClubs key={index} identity={fields}></RenderClubs>
    })}
  </div>
 <Footer/>
</> 
}
    </div>
    </>
  )
}
