import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from '../UserComponents/RenderClubs';
import "../../css/AllClubs.css"
import "../../css/ClubsRow.css"
import GlobalHeader from '../../common/GlobalHeader'

export default function AllClubs(props) {
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
    <GlobalHeader/>
    <div className='d-flex justify-content-center' style={{marginTop: "69px"}}><h1><strong>All Clubs</strong></h1></div>
    {loading && <div className='d-flex justify-content-center mt-auto'>
    <div className='d-flex align-items-center'>
    <span style={{fontSize: "35px"}}>Loading </span>
    <div className="my-auto spinner-border text-black " role="status">
    </div>
    </div>
    </div>}
    {!loading && <><div className='d-flex col-lg-4 col-md-6 p-0'>
          <form className="d-flex mt-3 mb-3 w-100 ml-lg-5 ml-md-4 mx-4" role="search">
            <input className="form-control" type="search" style={{borderRadius: "20px", border: "0.5px solid black"}} onChange={(event)=>setSearhTerm(event.target.value)} placeholder="Search Club Name" aria-label="Search"/>
            <i className="bi bi-search position-relative" style={{float: "right", right: "30px", borderRadius: "20px", top: "7px", width: "0px"}}></i>
          </form>
        </div>
        <div className='d-flex px-3 px-md-2 flex-wrap ml-xl-4'>
        {/* eslint-disable-next-line */}
        {recentClubs?.data?.filter((val)=>{
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
    </>
}
    </>
  )
}
