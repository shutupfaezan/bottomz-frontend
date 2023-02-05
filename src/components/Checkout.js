import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import GlobalHeader from '../common/GlobalHeader'
import { useParams } from "react-router-dom";

export default function Checkout() {
  const [billInfo, setBillInfo] = useState()
    const params = useParams()
    const bill = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/fetch-orders?order_id=${params.order_id}`)}
    useEffect(() => {
        bill()
        .then((response) => {
          setBillInfo(response?.data)
        })
        .catch((error) => {
          console.log(error);
        });
    })
  return (
    <div>
      <GlobalHeader/>
      <div className="p-md-5">
      <h3>Order Id: #{billInfo?.[0]?.order_id}</h3>
      </div>
    </div>
  )
}
