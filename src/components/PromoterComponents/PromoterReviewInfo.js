import React from 'react'
// import axios from 'axios';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';

export default function PromoterReviewInfo() {
  const { eventInfoValue } = useContext(SingularContext);
  const uploaded = eventInfoValue?.event_information?.images_url
  const fileBlob = new Blob([uploaded], { type: uploaded?.type })
  function submitEventRequest(){
    console.log(eventInfoValue)
    // axios.post(`https://nightlife-2710.herokuapp.com/appli?promoter_access_token=${sessionStorage.token}`, eventInfoValue)
      .then(() => {
        try {
          const formData = new FormData();
          formData.append('msg', eventInfoValue?.event_information?.images_url);
          console.log(formData)
          // axios.post(`https://nightlife-2710.herokuapp.com/event-poster?event_name=${eventInfoValue?.event_information?.event_name}`, formData);
        } catch (error) {
          console.log(error);
        }
        // axios.post(``, eventInfoValue?.event_information?.images_url)
      })
  }
  
  return (
  <div className='mt-0 mt-md-4 pl-md-2 pr-lg-5 pr-md-2' style={{fontSize: "14px"}}>
    <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pr-md-3">
          <label className= "form-label mb-0" style={{fontWeight: "400"}}>Event Name</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" id="floatingInputGrid" disabled={true}  defaultValue={eventInfoValue?.event_information?.event_name}/>
      </div>
      <div className="col px-0 mt-2 col-lg-6 mt-md-0 ml-md-2 ml-0 pl-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Venue/Club Name:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true}  defaultValue={eventInfoValue?.event_information?.event_venue}/>
      </div>
      </div>  
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pr-md-3">
          <label className='form-label mb-0' style={{fontWeight: "400"}}>Date:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.date}/>
      </div>
      <div className="col px-0 mt-2  col-lg-6 mt-md-0 ml-md-2 ml-0 pl-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Day:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.day}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pr-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Timings:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.timings}/>
      </div>
      <div className="col px-0 mt-2  col-lg-6 mt-md-0 ml-md-2 ml-0 pl-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Curated By:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.curated_by}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Featuring:</label>
          <input type="text" className="form-control" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} disabled={true} defaultValue={eventInfoValue?.event_information?.featuring}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pr-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Genre:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.genre}/>
      </div>
      <div className="col px-0 mt-2 col-lg-6 mt-md-0 ml-md-2 ml-0 pl-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Price:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.event_information?.price_range}/>
      </div>
      </div>
      <div className=' my-3'>
      <label className="form-label mb-0 d-block mb-2" style={{fontWeight: "400"}}>Event images_url:</label>
          {fileBlob && (
            <img className='col-md-6 colml-0 p-2' src={URL.createObjectURL(fileBlob)} alt="Oops..Looks like you forgot to upload an event images_url" style={{border: "2px solid black", borderRadius: "20px"}}/>
          )}
        </div>
      <div className='d-md-flex mt-2'>
        <div className="col px-0 mt-2 mt-md-0">
          <label className='form-label mb-0' style={{fontWeight: "400"}}>Terms and Conditions:</label>
      {eventInfoValue?.event_information?.terms.map((identity, fields)=>{
        return <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control mb-2" disabled={true} defaultValue={identity}></input>
    })}
    </div>
    </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Description:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.description}/>
      </div>
      </div>
    <div className='my-4'>
        <b className='mt-4 ml-2' style={{fontSize: "16px"}}>Pricing Categories:</b>
            <table className="table table-hover mt-3">
            <thead style={{color: "white", background: "black"}}>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
                <tbody>
                  {eventInfoValue?.ticket_information?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <th style={{alignItems: "center", width: "33%", fontWeight: "lighter"}} scope="row">
                        <div>{identity.ticket_category}</div>
                        <div style={{fontWeight: "400"}}>{identity.cover_description}</div>
                        <div style={{fontWeight: "400"}}>{identity.description}</div>
                        </th>
                        <td>
                          {identity.price}
                        </td>
                        <td>
                          {identity.total_quantity}
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
              </div>
        <div className='w-100 d-flex justify-content-center'>   
      <button type="submit" onClick={submitEventRequest} style={{background: "black"}} className="btn btn-primary mt-3 col-md-4 py-2 w-100">Create Event Request</button>
      </div>
    </div>
  )
}
