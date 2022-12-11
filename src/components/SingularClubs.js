import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Button from '@mui/material/Button';
import RenderEvents from './RenderEvents';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


export default function SingularClubs() {
const [clubVariable, setClubVariable] = useState()
const [eventVariable, setEventVariable] = useState()
    const params = useParams()
    const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/fetch-single-club?name=${params.name}`)}
    const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events`)}
    
    useEffect(() => {
        club()
        .then((response) => {
            setClubVariable(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        event()
        .then((response) => {
          setEventVariable(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
  return (
    <>
    <div>
    <div style={{height: "256px"}}>
    <div className='d-flex flex-column text-white align-items-center justify-content-center' style={{height: "100%"}}>
      <img src='http://pavbca.com/walldb/original/5/1/7/484530.jpg' style={{width: '100%', height: "100%"}} alt=''/>
    </div>
    <div className= "position-absolute text-white d-flex flex-column justify-content-center align-items-center w-100" style={{top: "0px", height: "inherit"}}>
    <h1 className='d-flex'><strong>{clubVariable?.name}</strong></h1>
      <h4 className='d-flex'><strong>{clubVariable?.area}</strong></h4>
     { clubVariable && <Button variant="outlined" className="mt-3" endIcon={<LocationOnOutlinedIcon />} style={{backgroundColor: "white", color: "black"}}>Locate</Button>}
    </div>
    </div>
    <div className='d-flex flex-wrap justify-content-center'>
    {eventVariable?.map((fields, index )=> {
      return <RenderEvents key={index} identity={fields}></RenderEvents>
    })}
    </div>
    </div>
    </>
  )
}
