// import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';

export default function PromoterReviewInfo() {
  const { eventInfoValue } = useContext(SingularContext);
  const uploaded = eventInfoValue?.[0]?.poster
  const fileBlob = new Blob([uploaded], { type: uploaded?.type })
  function submitEventRequest(){
    console.log(eventInfoValue)
    // axios.post(`https://nightlife-2710.herokuapp.com/login`, eventInfoValue)
  }
  return (
    <div className='mt-4 ml-2'>
      <div className='d-md-flex'>
      <div className="col px-0 ">
        <div className="form-floating">
          <input type="text" style={{border: "0px", background: "white"}} className="form-control" id="floatingInputGrid" disabled={true}  defaultValue={eventInfoValue?.[0]?.event_name}/>
          <label htmlFor="floatingInputGrid">Event Name</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" style={{border: "0px", background: "white"}}  className="form-control" id="floatingInputGrid" disabled={true}  defaultValue={eventInfoValue?.[0]?.event_venue}/>
          <label htmlFor="floatingInputGrid">Venue/Club Name:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 ">
        <div className="form-floating">
          <input style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.date}/>
          <label htmlFor="floatingInputGrid">Date:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.day}/>
          <label htmlFor="floatingInputGrid">Day:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input  style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.timings}/>
          <label htmlFor="floatingInputGrid">Timings:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input  style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.curated_by}/>
          <label htmlFor="floatingInputGrid">Curated By:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input  style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.genre}/>
          <label htmlFor="floatingInputGrid">Genre:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input  style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.price}/>
          <label htmlFor="floatingInputGrid">Price:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.featuring}/>
          <label htmlFor="floatingInputGrid">Featuring:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.[0]?.description}/>
          <label htmlFor="floatingInputGrid">Description:</label>
        </div>
      </div>
      </div>
      {eventInfoValue?.[0]?.terms.map((identity, fields)=>{
        return <div className='d-md-flex mt-2'>
        <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input style={{border: "0px", background: "white"}} type="text" className="form-control" id="floatingInputGrid" disabled={true} defaultValue={identity}/>
          <label htmlFor="floatingInputGrid">T&C {fields + 1}:</label>
        </div>
      </div>
        </div>
      })}
      <div>
        <h5 className='mt-4 ml-2'>Pricing Categories:</h5>
            <table className="table table-hover">
                <tbody>
                  {eventInfoValue?.[1]?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <th style={{alignItems: "center", width: "33%", fontWeight: "lighter"}} scope="row">
                        <div>{identity.ticketCategories}</div>
                        <div>{identity.coverDescription}</div>
                        <div>{identity.description}</div>
                        </th>
                        <td>
                            Price: {identity.price}
                        </td>
                        <td>
                            Oty: {identity.totalQuantity}
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
              </div>
              <div className='d-md-block d-none'>
                <h5 className='mt-4 ml-2'>Event Image:</h5>
                {fileBlob && (
                  <img className='w-50 ml-2' src={URL.createObjectURL(fileBlob)} alt="Oops..Looks like you forgot to upload an event poster" />
                )}
              </div>
              <div className='d-md-none d-block'>
                <h5 className='mt-4 ml-2'>Event Image:</h5>
                {fileBlob && (
                  <img className='w-100 ml-2' src={URL.createObjectURL(fileBlob)} alt="Oops..Looks like you forgot to upload an event poster" />
                )}
              </div>
              <button type="submit" onClick={submitEventRequest}className="btn btn-primary mt-3 ml-2 w-100">Create Event Request</button>
    </div>
  )
}
