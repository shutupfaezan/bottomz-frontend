import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SingularContext } from '../contexts/Context';
import { useLocation } from 'react-router-dom';
import {useContext} from 'react'
import Modal from 'react-bootstrap/Modal';


export default function AttendeeModal() {
    const navigate = useNavigate()

    const location = useLocation(); //sub-promoter functionailty
    const searchParams = new URLSearchParams(location.search);
    const subPromoter = searchParams.get('sub-promoter');

    const {inputValues, inputModal, setInputModal} = useContext(SingularContext);
    const [attendeeValue, setAttendeeValue] = useState([])
    const [fieldError, setFieldError] = useState(null)
    const [isLoading, setisLoading] = useState(false);
    const order_details = inputValues
  .filter(obj => obj != null)
  .filter(obj => obj.quantity !== 0);

    const plus = {attendeeValue, order_details}
      
  
    let fieldsNo = 0
    for (let j = 0; j < order_details.length; j++) {
      fieldsNo += parseInt(order_details[j].quantity)
    }

    const numbers = [];
    for (let i = 1; i <= fieldsNo; i++) {
        numbers.push(i);
      }

    const handleAttendeeName = (event, index) => {
    const newAttendeeValues = [...attendeeValue];
    newAttendeeValues[index] = {
        ...newAttendeeValues[index],
    "attendee_name" : event.target.value
    };
    setAttendeeValue(newAttendeeValues);
    };
    
    function handleClose(){setInputModal(false); setAttendeeValue([]); setFieldError(null)}

    function submitinter() {
      setFieldError(null)
      const filledFields = attendeeValue.filter((attendee) => !!attendee?.attendee_name);
      if (filledFields.length !== fieldsNo) {
        // not all fields have been filled in
        setFieldError('Please fill in all attendee fields before continuing.');
        return;
      }
      setisLoading(true);
      sessionStorage.setItem('checkoutData', JSON.stringify(plus));
      setisLoading(false);
      navigate(`checkout?sub_promoter=${subPromoter}`);
    }
    
  return (
    <Modal show={inputModal} onHide={handleClose} centered>
        <div style={{padding: "30px"}}>
            <p className='d-flex justify-content-center mb-1'>Quite the list. Who's attending?</p>
            <p className='d-flex justify-content-center'style={{color: "gray", fontSize: "12px"}}>(These names will be included in the ticket and can't be changed later)</p>
            {numbers?.map((identity, index)=>{
            return <div className="d-flex justify-content-center align-items-center mt-2" key={index}>{identity}<input className="form-control w-100 mx-2" placeholder="Eg:- Aman Gupta" style={{width: "100%", borderRadius: "15px"}} id={"attendee Name" + index} name={"attendee Name" + index} onChange={(event) => handleAttendeeName(event, index)}/></div>
            })}
            {
              fieldError && <small style={{color: "crimson", textAlign: "center", display: "block", marginTop: "20px"}}>{fieldError}</small>
            }
            <button className='mx-auto d-block btn btn-primary mt-3' onClick={()=>{submitinter()}} style={{fontSize: '14px', borderRadius: "18px"}}>
            {!isLoading && <span>Continue</span>}
            {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
            {isLoading && (<span id="login-loading-text-span">Loading</span>)}
            </button>
        </div>
    </Modal> 
  )
}
