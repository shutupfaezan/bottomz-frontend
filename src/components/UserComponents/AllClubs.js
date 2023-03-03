import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from '../UserComponents/RenderClubs';
import "../../css/AllClubs.css"
import "../../css/ClubsRow.css"
import GlobalHeader from '../../common/GlobalHeader'
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import Footer from '../../common/Footer';

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
    <GlobalHeader/>
    {loading && <div className='d-flex justify-content-center mt-auto'>
    <div className='d-flex align-items-center'>
    <span style={{fontSize: "35px"}}>Loading </span>
    <div className="my-auto spinner-border text-black " role="status">
    </div>
    </div>
    </div>}
    {!loading && <>
    <BrowserView>
    <div className='svgbg mb-5' style={{height: "200px"}}></div>
    <div className='d-md-flex px-5 justify-content-between position-absolute w-100' style={{top: '125px'}}>
      <div className='d-flex'>
        <div className='primary-header ml-5' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
        <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Clubs</div>
      </div>
      <div className='d-flex col-lg-4 col-md-6 p-0'>
        <form className="d-flex mt-3 mb-3 w-100 ml-lg-5 ml-md-4 mx-md-4" role="search">
          <input className="form-control py-3" type="search" style={{borderRadius: "20px", fontSize: "12px", border: "0.5px solid black", paddingLeft: "35px"}} onChange={(event)=>setSearhTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
          <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "7px", width: "0px", fontSize: "13px"}}></i>
        </form>
      </div>
    </div>
    </BrowserView>
    <TabletView>
    <div className='svgbg mb-2' style={{height: "200px"}}></div>
    <div className='d-md-flex pr-5 pl-5 justify-content-between position-absolute w-100' style={{top: '125px'}}>
      <div className='d-flex'>
        <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
        <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Clubs</div>
      </div>
      <div className='d-flex col-lg-4 col-md-6 p-0'>
        <form className="d-flex mt-3 mb-3 w-100 ml-lg-5 ml-md-4 mx-md-4" role="search">
          <input className="form-control py-3" type="search" style={{borderRadius: "20px", fontSize: "12px", border: "0.5px solid black", paddingLeft: "35px"}} onChange={(event)=>setSearhTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
          <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "7px", width: "0px", fontSize: "13px"}}></i>
        </form>
      </div>
    </div>
    </TabletView>
    <MobileOnlyView>
    <div className='svgbg mb-3' style={{height: "300px"}}></div>
    <div className='d-md-flex pr-5 pl-5 justify-content-between position-absolute w-100' style={{top: '135px'}}>
      <div className='d-flex justify-content-center'>
        <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>All</div>
        <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>Clubs</div>
      </div>
      <div className='d-flex col-lg-4 col-md-6 p-0'>
        <form className="d-flex mt-3 mb-3 w-100 ml-lg-5 ml-md-4 mx-md-4" role="search">
          <input className="form-control py-3" type="search" style={{borderRadius: "20px", fontSize: "12px", border: "0.5px solid black", paddingLeft: "35px"}} onChange={(event)=>setSearhTerm(event.target.value)} placeholder="Search for ..." aria-label="Search"/>
          <i className="bi bi-search position-relative" style={{float: "left", right: "95%", borderRadius: "20px", top: "7px", width: "0px", fontSize: "13px"}}></i>
        </form>
      </div>
    </div>
    </MobileOnlyView>
        <div className='d-flex px-3 px-md-2 flex-wrap m-xl-5'>
        {/* eslint-disable-next-line */}
        {recentClubs?.data?.reverse().filter((val)=>{
            if(searchTerm === undefined){
              return val
            }
            else if(searchTerm === ""){
              return val
            }
            else if(val.club_name.toLowerCase().includes(searchTerm?.toLowerCase())){
              return val
            }
          }).map((fields, index )=> {
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
