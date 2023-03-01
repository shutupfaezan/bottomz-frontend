import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PromoterEventStat() {
   const params = useParams()
   console.log(params)
const [eventData, setEventData] = useState()
const [orderData, setOrderData] = useState()
    const OnGoingEventdata = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_name=${params.event_name}&promoter_access_token=${sessionStorage?.token}`)}
    useEffect(() => {
        OnGoingEventdata()
        .then((response) => {
            setEventData(response?.data?.Event_Information)
            setOrderData(response?.data?.Order_Details)
            })
            .catch((error) => {
                console.log(error);
            });
            // eslint-disable-next-line
        }, []);
  return (
    <div>
        <img style={{width: "20%"}} alt="" src={eventData?.images_url}/>
    </div>
  )
}
