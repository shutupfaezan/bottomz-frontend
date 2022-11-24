import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from './RenderClubs';
import "../css/AllClubs.css"

export default function AllClubs(props) {
    const [recentClubs, setRecentClubs] = useState()
   const make = async ()=> { return await axios.get("https://nightlife-2710.herokuapp.com/club")}

    // console.log(recentClubs?.data)
    useEffect(() => {
      make()
        .then((response) => {
          setRecentClubs(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <>
    <div className='d-flex justify-content-center my-3'><h1>All Clubs</h1></div>
    <div className='d-flex flex-wrap justify-content-center text-white'>
    {recentClubs?.data.map((fields, index )=> {
      return <RenderClubs key={index} identity={fields}></RenderClubs>
    })}
    </div>
    </>
  )
}
