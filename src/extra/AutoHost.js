import React, { useState } from 'react'; 
// import { useFormik } from 'formik'
import "../css/HostBarExtra.css"
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import Input from '../common/Input';


export default function AutoHost() {
    
//     const formik = useFormik({
//    initialValues: {
//     event_name: "",
//     event_venue: "",
//     curated_by: "",
//     day: "",
//     date: "",
//     timings: "",
//     genre: "",
//     price: "",    
//     description: "",    
//     featuring: "",    
//    }})
    const inputArr = [
        {
          type: 'text',
          id: 1,
          value: '',
        },
      ];
const [arr, setArr] = useState(inputArr);
const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: 'text',
          value: '',
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };


  const {setShow} = useContext(SingularContext);

  return (
    <div className='imPEHI leHLON'> 
        <div elevation="2" className='jksHKM uAaqh'>
            <div className='dLUKiG pr-1 pt-md-3' >
                <span size="18" letterSpacing="normal" className='fcxZkm'>Login</span>
            </div>
            <div className='dLUKiG pr-1 pt-md-3 pt-2 pl-4'>
                <span color='yellow-8' size="18" letterSpacing="normal" className='fcxZkm'>Event Info</span>
            </div>
            <div className='dLUKiG pr-1 pt-md-3 pl-4'>
                <span className='fcxZkm'>Price</span>
            </div>
            <div className='dLUKiG pr-2 pt-md-3 pl-4'>
                <span className='fcxZkm'>Review</span>
            </div>
        </div>
      {!sessionStorage.token && <div className='mt-4 d-flex flex-column justify-content-center' style={{border: "1px dashed rgb(136,16,111)", height: "250px", borderRadius: "15px"}}>
            <p className='d-flex justify-content-center'>Looks like your not logged in to your account</p>
            <button type="submit" onClick={()=>setShow(true)} className="btn mt-2 mx-auto " style={{borderRadius: "20px", color: "#7d10bf", border: "1px solid #7d10bf", width: "fit-content"}}>Log In</button>
        </div>}
      {sessionStorage.token && <div className='mt-4 ml-2'>
                <form className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Event Name:</label>
                        <Input name="event_name" placeholder="Enter Event Name"></Input>
                    </div>
                    <div className='d-flex flex-column'  style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Date:</label>
                        <Input type="date"></Input>
                    </div>
                </form>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Venue/Club Name:</label>
                        <Input placeholder="Enter Club Name"></Input>
                    </div>
                    <div className='d-flex flex-column' style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Day:</label>
                        <Input placeholder="Select"></Input>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Curated By:</label>
                        <Input placeholder="Enter Organizer Name"></Input>
                    </div>  
                    <div className='d-flex flex-column' style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Timings:</label>
                        <Input placeholder='00:00-00:00'></Input>
                    </div>  
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Featuring:</label>
                        <Input placeholder="Enter Featuring Artist"></Input>
                    </div>  
                    <div className='d-flex flex-column' style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Genre:</label>
                        <Input placeholder="Select"></Input>
                    </div>  
                </div>
                <div className='d-flex flex-column mt-2' style={{width: "100%"}}>
                        <div className="d-flex align-items-center"><label className='ml-2 mb-1'>Terms And Conditions:</label><i onClick={addInput} className="fa-solid fa-plus ml-auto mr-2 mb-1" style={{fontSize: "18px"}} ></i></div>
                        {arr.map((item, i) => {
                return (
                <Input
                    id={i}
                    name="terms"
                    value={item.value}
                    type={item.type}
                    placeholder="Enter event terms and conditions"
                    handleChange={handleChange}
                />
                );
            })}
                </div>
                <div className='d-flex flex-column w-100'>
                        <label className='ml-2 mb-1'>Description:</label>
                        <textarea placeholder="About The Event" className="form-control ml-lg-2" style={{borderRadius: "20px", height: "100px"}}></textarea>
                </div>
                <button type="submit" className="btn mt-3 ml-2" style={{borderRadius: "20px", color: "#7d10bf", border: "1px solid #7d10bf", width: "fit-content"}}>Submit</button>
         </div>}
        <div>
        </div>
    </div>
  )
}
