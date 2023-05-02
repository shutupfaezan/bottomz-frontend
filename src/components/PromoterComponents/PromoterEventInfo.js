import React, {useState} from 'react';
// import axios from 'axios';
import { useFormik } from 'formik'
import Input from '../../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';


export default function PromoterEventInfo() {
  const { eventInfoValue , setEventStepper, eventStepper } = useContext(SingularContext);
  const [selectedFile, setSelectedFile] = useState(null);
    const [arr, setArr] = useState(['']);
    
    const addInput = () => {
        setArr([...arr, '']);
    };
    const handleChange = (index, event) => {
        const newValues = [...arr];
        newValues[index] = event.target.value;
        setArr(newValues);
    }

    const initialValues = {
            event_name: "",
            event_venue: "",
            curated_by: "",
            day: "",
            date: "",
            timings: "",
            genre: "",
            price_range: "",   
            description: "",    
            featuring: "",
            images_url: "",
            terms: []
        }
    const formik = useFormik({
        initialValues
    })

    function SubmitEventInfo(event) {
        event.preventDefault();
        
        const eventInfo = { ...formik.values, terms: [...arr], images_url: selectedFile };
        eventInfoValue.event_information = eventInfo;
        console.log(eventInfoValue)
        setEventStepper(eventStepper + 1);
      }
  return (
    <div className='mt-0 mt-md-4 pl-md-2 pr-lg-5 pr-md-2'>
            <form className='d-flex flex-column' style={{height: "100%", fontSize: "14px", fontWeight: "400 !important"}}>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pr-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Event Name:</label>
                        <Input name="event_name" handleChange={formik.handleChange} value={formik.values.event_name} placeholder="Enter Event Name" useInput={1}></Input>
                    </div>
                    <div className='d-flex flex-column col-lg-6 px-0 pl-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Date:</label>
                        <Input name="date" placeholder="DD-MM-YYYY" handleChange={formik.handleChange} value={formik.values.date} type="date" useInput={1}></Input>
                    </div>
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pr-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Venue/Club Name:</label>
                        <Input name="event_venue" handleChange={formik.handleChange} value={formik.values.event_venue} placeholder="Enter Club Name"  useInput={1}></Input>
                    </div>
                    <div className='d-flex flex-column col-lg-6 p-0 px-0 pl-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Day:</label>
                        <Input name="day" handleChange={formik.handleChange} value={formik.values.day} placeholder="Select"  useInput={1}></Input>
                    </div>
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pr-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Curated By:</label>
                        <Input name="curated_by" handleChange={formik.handleChange} value={formik.values.curated_by} placeholder="Enter Organizer Name" useInput={1}></Input>
                    </div>  
                    <div className='d-flex flex-column col-lg-6 px-0 pl-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Timings:</label>
                        <Input name="timings" handleChange={formik.handleChange} value={formik.values.timings} placeholder='00:00-00:00' useInput={1}></Input>
                    </div>  
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col p-0'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Featuring:</label>
                        <Input name="featuring" handleChange={formik.handleChange} value={formik.values.featuring} placeholder="Enter Artist/Dj Name" useInput={1}></Input>
                    </div>  
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6  px-0 pr-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Price Range:</label>
                        <Input name="price_range" handleChange={formik.handleChange} value={formik.values.price_range} placeholder="Eg: 1000 - 3000" useInput={1}></Input>
                    </div>  
                    <div className='d-flex flex-column col-lg-6 px-0 pl-md-3'>
                        <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Genre:</label>
                        <Input name="genre" handleChange={formik.handleChange} value={formik.values.genre} placeholder="Select" useInput={1}></Input>
                    </div>  
                </div>
                <div className="d-flex flex-column col p-0 mb-2">
                    <label htmlFor="formFile" className=" ml-2 mb-1" style={{fontWeight: "400"}}>Event Poster <small>(only one jpeg/jpg/png)</small></label>
                    <input className="p-2" style={{border: "2px solid black", borderRadius: "10px", fontSize: "14px", fontWeight: "400"}}onChange={(event)=>setSelectedFile(event.target.files[0])} type="file" id="formFile" useInput={1}/>
                </div>
                <div className='d-flex flex-column col p-0 mb-2'>
                    <div className="d-flex align-items-center"><label className='ml-2 mb-1'  style={{fontWeight: "400"}}>Terms And Conditions:</label></div>
                    {arr.map((item, index) => {
                    return (
                        <>
                        <div className='d-flex mb-2'>
                        <div className='col-10 p-0 pr-2'>
                    <Input
                        key={`item.${index}.value`}
                        name={`item.${index}.value`}
                        id={index}
                        value={item}
                        type={item.type}
                        placeholder="Enter event terms and conditions"
                        handleChange={(event)=> handleChange(index, event)}
                        useInput={1}
                    />
                    </div>
                    <div  onClick={addInput} className='d-flex justify-content-center align-items-center col-2' style={{background: "black", borderRadius: "10px"}}>
                    <i onClick={addInput} className="fa-solid fa-plus ml-auto col-md-none mr-2 d-block d-md-none mb-1 align-self-center" style={{fontSize: "18px", color: "white"}} ></i>
                    <p className='text-white m-0 d-md-block d-none'>Add More</p>
                    </div>
                    </div>
                    </>
                    );
                    })}
                </div>
                <div className='d-flex flex-column col p-0'>
                    <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Description:</label>
                    <textarea name="description" onChange={formik.handleChange} value={formik.values.description} placeholder="About The Event" className="form-control" style={{borderRadius: "10px", height: "100px", border: "2px solid black"}}></textarea>
                </div>
                <div className='d-flex justify-content-center w-100'>
                <button type="submit" onClick={SubmitEventInfo} className="btn mt-3 col-lg-4 px-3 py-2 text-white" style={{background: "black", borderRadius: '10px'}}>Continue to Pricing...</button>
                </div>
            </form>
    </div>
  )
}
