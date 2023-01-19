import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function SingularEvents() {
    const [singleEvent, setSingleEvent] = useState()
    const params = useParams()
    const event = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/events/${params.event_name}`)}
    
    useEffect(() => {
      event()
      .then((response) => {
        console.log(response.data)
        setSingleEvent(response?.data)
      })
      .catch((error) => {
        console.log(error);
      });
      //eslint-disable-next-line
    }, []);

    const newTerms  = singleEvent?.terms?.slice(2, singleEvent?.terms?.length - 2).split(".,")
    return (
    <div>
      <div className='w-100 p-4 d-md-flex' style={{background: "#361532"}}>
        <div style={{maxWidth: "100%"}}>
        <img style={{height:"auto", maxHeight: "250px", maxWidth: "100%"}} src={singleEvent?.images_url} alt=""/>
        </div>
        <div className='mt-lg-0 mt-md-0 mt-4 w-100'>
          <h2 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_name}</h2>
          <h5 className="ml-md-4" style={{color: "white"}}>{singleEvent?.event_venue}</h5>
            <p className="ml-md-4 d-inline-flex p-1 bg-white mt-2 px-3" style={{color: "#1c1d1f", border: "1px solid white", borderRadius: "10px", fontSize: "13px"}}>{singleEvent?.genre}</p>
          <h6 className="ml-md-4" style={{color: "white"}}>Curated by : {singleEvent?.curated_by}</h6>
        </div>
      </div>
      <div className='d-lg-flex'>
        <div className='col-lg-6'>
          <h4 className='mt-4' style={{color: "#88106f"}}>Description: </h4>
          <h6>{singleEvent?.description}</h6>
          <h4 className='mt-4' style={{color: "#88106f"}}>Terms and conditions: </h4>
          <h6><ul className='pl-3'>{newTerms?.map((fields, index )=> {
          return <li key={index}>{fields + "."}</li>
        })}</ul></h6>
        </div>
        <div className='col-lg-6'>
        <h4 className='mt-4 mb-4' style={{color: "#88106f"}}>Ticket Info </h4>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th style={{fontWeight: "100", alignItems: "center", width: "33%"}} scope="row">
                  <div>Phase 1</div>
                  <div>only Entry</div>
                  <div style={{color: "gray"}}>No cover</div>
                </th>
                <td style={{fontWeight: "100", verticalAlign: "middle"}}>$499</td>
                <td style={{fontWeight: "100", verticalAlign: "middle", textAlign: "center"}}>
                  <div className="input-group mb-3 w-50 float-right">
                    <label className="input-group-text w-50" htmlFor="inputGroupSelect01">Qty</label>
                    <select className="form-select" id="inputGroupSelect01">
                      <option defaultValue>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                      <option value="3">5</option>
                      <option value="3">6</option>
                      <option value="3">7</option>
                      <option value="3">8</option>
                      <option value="3">10</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th style={{fontWeight: "100", alignItems: "center", width: "33%"}} scope="row">
                  <div>Phase 1</div>
                  <div>only Entry</div>
                  <div style={{color: "gray"}}>No cover</div>
                </th>
                <td style={{fontWeight: "100", verticalAlign: "middle"}}>$499</td>
                <td style={{fontWeight: "100", verticalAlign: "middle", textAlign: "center"}}>
                  <div className="input-group mb-3 w-50 float-right">
                    <label className="input-group-text w-50 float-right" htmlFor="inputGroupSelect01">Qty</label>
                    <select className="form-select" id="inputGroupSelect01">
                      <option defaultValue>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                      <option value="3">5</option>
                      <option value="3">6</option>
                      <option value="3">7</option>
                      <option value="3">8</option>
                      <option value="3">10</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th style={{fontWeight: "100", alignItems: "center", width: "33%"}} scope="row">
                  <div>Phase 1</div>
                  <div>only Entry</div>
                  <div style={{color: "gray"}}>No cover</div>
                </th>
                <td style={{fontWeight: "100", verticalAlign: "middle"}}>$499</td>
                <td style={{fontWeight: "100", verticalAlign: "middle", textAlign: "center"}}>
                  <div className="input-group mb-3 w-50 float-right">
                    <label className="input-group-text w-50" htmlFor="inputGroupSelect01">Qty</label>
                    <select className="form-select" id="inputGroupSelect01">
                      <option defaultValue>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                      <option value="3">5</option>
                      <option value="3">6</option>
                      <option value="3">7</option>
                      <option value="3">8</option>
                      <option value="3">10</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
  )
}
