import axios from 'axios';
import React from 'react'
import { useContext, useState } from 'react';
import { SingularContext } from '../../contexts/Context';

export default function PromoterReviewInfo() {
  const [file, setFile] = useState(null);
  const { eventInfoValue } = useContext(SingularContext);
  const uploaded = eventInfoValue?.[0]?.poster
  // console.log(uploaded)
    const reader = new FileReader();

    reader.readAsArrayBuffer(uploaded);

    reader.onload = () => {
      const blob = new Blob([reader.result], { type: uploaded.type });
      setFile(blob)
    }
function submitEventRequest(){
  axios.post("https://nightlife-2710.herokuapp.com/login", eventInfoValue)
}
  return (
    <div className='mt-4 ml-2'>
      <div className='d-md-flex'>
      <div className="col px-0 ">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.event_name} disabled/>
          <label for="floatingInputGrid">Event Name</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.event_venue} disabled/>
          <label for="floatingInputGrid">Venue/Club Name:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 ">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.date} disabled/>
          <label for="floatingInputGrid">Date:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.day} disabled/>
          <label for="floatingInputGrid">Day:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.timings} disabled/>
          <label for="floatingInputGrid">Timings:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.curated_by} disabled/>
          <label for="floatingInputGrid">Curated By:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.genre} disabled/>
          <label for="floatingInputGrid">Genre:</label>
        </div>
      </div>
      <div className="col px-0 mt-2 mt-md-0 ml-md-2 ml-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.price} disabled/>
          <label for="floatingInputGrid">Price:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.featuring} disabled/>
          <label for="floatingInputGrid">Featuring:</label>
        </div>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={eventInfoValue?.[0]?.description} disabled/>
          <label for="floatingInputGrid">Description:</label>
        </div>
      </div>
      </div>
      {eventInfoValue?.[0]?.terms.map((identity, fields)=>{
        return <div className='d-md-flex mt-2'>
        <div className="col px-0 mt-2 mt-md-0">
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGrid"  value={identity} disabled/>
          <label for="floatingInputGrid">T&C {fields + 1}:</label>
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
                {file && (
                  <img className='w-50 ml-2' src={URL.createObjectURL(file)} alt="uploaded file" />
                )}
              </div>
              <div className='d-md-none d-block'>
                <h5 className='mt-4 ml-2'>Event Image:</h5>
                {file && (
                  <img className='w-100 ml-2' src={URL.createObjectURL(file)} alt="uploaded file" />
                )}
              </div>
              <button type="submit" onClick={submitEventRequest}className="btn btn-primary mt-3 ml-2 w-100">Create Event Request</button>

    </div>
  )
}
