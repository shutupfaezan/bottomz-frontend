import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from './RenderClubs';
import "../css/AllClubs.css"
import "../css/ClubsRow.css"



export default function AllClubs(props) {
    const [recentClubs, setRecentClubs] = useState()
   const clubList = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}

    useEffect(() => {
      clubList()
        .then((response) => {
          setRecentClubs(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <>
    <div className='d-flex justify-content-center mt-5'><h1><strong>All Clubs</strong></h1></div>
    <div className='d-flex flex-wrap justify-content-center'>
    {recentClubs?.data.map((fields, index )=> {
      return <RenderClubs key={index} identity={fields}></RenderClubs>
    })}
    </div>
    </>
  )
}
