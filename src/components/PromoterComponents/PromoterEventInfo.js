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
            price: "",   
            description: "",    
            featuring: "",
            poster: null,
            terms: []
        }
        
    const formik = useFormik({
        initialValues
    })

    function SubmitEventInfo(event){
        event.preventDefault()
        formik.values.terms = [...arr]
        formik.values.poster = selectedFile
        eventInfoValue.push(formik.values)
        setEventStepper( eventStepper + 1)
    }
  return (
    <div className='mt-4 ml-2'>
            <form className='d-flex flex-column' style={{height: "100%"}}>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Event Name:</label>
                        <Input name="event_name" handleChange={formik.handleChange} value={formik.values.event_name} placeholder="Enter Event Name"></Input>
                    </div>
                    <div className='d-flex flex-column'  style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Date:</label>
                        <Input name="date" handleChange={formik.handleChange} value={formik.values.date} type="date"></Input>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Venue/Club Name:</label>
                        <Input name="event_venue" handleChange={formik.handleChange} value={formik.values.event_venue} placeholder="Enter Club Name"></Input>
                    </div>
                    <div className='d-flex flex-column' style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Day:</label>
                        <Input name="day" handleChange={formik.handleChange} value={formik.values.day} placeholder="Select"></Input>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "60%"}}>
                        <label className='ml-2 mb-1'>Curated By:</label>
                        <Input name="curated_by" handleChange={formik.handleChange} value={formik.values.curated_by} placeholder="Enter Organizer Name"></Input>
                    </div>  
                    <div className='d-flex flex-column' style={{width: "40%"}}>
                        <label className='ml-2 mb-1'>Timings:</label>
                        <Input name="timings" handleChange={formik.handleChange} value={formik.values.timings} placeholder='00:00-00:00'></Input>
                    </div>  
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column w-100'>
                        <label className='ml-2 mb-1'>Featuring:</label>
                        <Input name="featuring" handleChange={formik.handleChange} value={formik.values.featuring} placeholder="Enter Artist/Dj"></Input>
                    </div>  
                </div>
                <div className='d-flex'>
                    <div className='d-flex flex-column' style={{width: "50%"}}>
                        <label className='ml-2 mb-1'>Price:</label>
                        <Input name="price" handleChange={formik.handleChange} value={formik.values.price} placeholder="Select price range"></Input>
                    </div>  
                    <div className='d-flex flex-column' style={{width: "50%"}}>
                        <label className='ml-2 mb-1'>Genre:</label>
                        <Input name="genre" handleChange={formik.handleChange} value={formik.values.genre} placeholder="Select"></Input>
                    </div>  
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="formFile" class=" ml-2 mb-1">Event Poster <small>(only one jpeg/jpg/png)</small></label>
                    <Input className="form-control" handleChange={(event)=>setSelectedFile(event.target.files[0])} type="file" id="formFile"/>
                </div>
                <div className='d-flex flex-column mt-2' style={{width: "100%"}}>
                    <div className="d-flex align-items-center"><label className='ml-2 mb-1'>Terms And Conditions:</label><i onClick={addInput} className="fa-solid fa-plus ml-auto mr-2 mb-1" style={{fontSize: "18px"}} ></i></div>
                    {arr.map((item, index) => {
                    return (
                    <Input
                        key={`item.${index}.value`}
                        name={`item.${index}.value`}
                        id={index}
                        value={item}
                        type={item.type}
                        placeholder="Enter event terms and conditions"
                        handleChange={(event)=> handleChange(index, event)}
                    />
                    );
                    })}
                </div>
                <div className='d-flex flex-column w-100'>
                    <label className='ml-2 mb-1'>Description:</label>
                    <textarea name="description" onChange={formik.handleChange} value={formik.values.description} placeholder="About The Event" className="form-control ml-lg-2" style={{borderRadius: "20px", height: "100px"}}></textarea>
                </div>
                <button type="submit" onClick={SubmitEventInfo} className="btn btn-primary mt-3 ml-2 w-100">Continue to Pricing...</button>
            </form>
    </div>
  )
}
