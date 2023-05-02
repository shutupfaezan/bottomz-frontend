import React, {useState} from 'react';
import Input from '../../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';


export default function PromoterPricing() {
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState(null);
    const [ticket_category, setTicket_Category] = useState('')
    const [description, setDescription] = useState('')
    const [cover_description, setCover_Description] = useState('')
    const [price, setPrice] = useState(null)
    const [total_quantity, set_Total_Quantity] = useState(null)
    const { eventInfoValue, setEventStepper, eventStepper} = useContext(SingularContext);


    function handleAddItem(event){
        setErrors(null)
        if (!ticket_category || !cover_description || !price || !total_quantity) {
            setErrors("Fill all required fields before adding the category")
            return;
        }
        const newItem = { ticket_category, description, cover_description, price, total_quantity };
        setItems([...items, newItem]);

        setTicket_Category('')
        setDescription('')
        setCover_Description('')
        setPrice('')
        set_Total_Quantity('')

        event.target.value = null
    }

    function submitPricing() {
        const price_info = items;
        eventInfoValue.ticket_information = price_info;
        console.log(eventInfoValue)
        setEventStepper(eventStepper + 1);
      }
      
    
  return (
    <div className='mt-0 mt-md-4 pl-md-2 pr-lg-5 pr-md-2'>
            <div className='col p-0 mb-2'>
            <label className='ml-2 mb-1'>Ticket Categories<span style={{color: "crimson"}}>*</span></label>
            <Input name="ticket_category" placeholder="Eg:- Male Stag" id="ticket_category" value={ticket_category} handleChange={event=>setTicket_Category(event.target.value)}  useInput={1}></Input>
            </div>
            <div className='d-md-flex mb-2'>
                <div className='col-lg-6 px-0 pr-md-3'>
                <label className='ml-2 mb-1'>Cover Description<span style={{color: "crimson"}}>*</span></label>
                <Input name="ticket_category" placeholder="Eg:- No Cover" id="ticket_category" value={cover_description} handleChange={event=>setCover_Description(event.target.value)} useInput={1}></Input>
                </div>
                <div  className='col-lg-6 px-0 pl-md-3'>
                <label className='ml-3 mb-1'>Description:</label>
                <Input name="description" placeholder="Eg:- Entry Only" id="description" value={description} handleChange={event=>setDescription(event.target.value)} useInput={1}></Input>
                </div>
            </div>
            <div className='d-md-flex mb-2'>
                <div className='col-lg-6 px-0 pr-md-3'>
                <label className='ml-3 mb-1'>Price (per ticket)<span style={{color: "crimson"}}>*</span></label>
                <Input name="price" type="number" placeholder="Eg:- Rs. 1000" id="price" value={price} handleChange={event=>setPrice(event.target.value)} useInput={1}></Input>
                </div>
                <div  className='col-lg-6 px-0 pl-md-3'>
                <label className='ml-3 mb-1'>Total Quantity<span style={{color: "crimson"}}>*</span></label>
                <Input name="total_quantity" type="number" placeholder="Eg:- 100" id="total_quantity" value={total_quantity} handleChange={event=>{set_Total_Quantity(event.target.value)}} useInput={1}></Input>
                </div>
            </div>
            <div>
                {errors && <span style={{color: "crimson"}}>{errors}</span>}
            </div>
        <div className='d-md-flex justify-content-between my-3 col p-0'>
        <button type="submit" style={{background: "crimson", borderRadius: "10px"}} onClick={handleAddItem} className="m-md-2 my-2 btn col-md-5 text-white p-0 py-2 ml-md-5">Add Pricing Category</button>
        <button type="submit" style={{background: "black", borderRadius: "10px"}} onClick={submitPricing} className="m-md-2 my-2 btn col-md-5 text-white p-0 py-2 mr-md-5">Review & Submit</button>
        </div>
        <div>
        <b className='my-3 ml-3'>Your added categories apper here:</b> 
        {items?.[0] && <div className='mt-3'>
            <table className="table table-hover">
            <thead style={{color: "white", background: "black"}}>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
                <tbody>
                  {items?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <td style={{alignItems: "center", width: "33%", fontWeight: "400"}}>
                        <b style={{display: "block"}}>{identity.ticket_category}</b>
                        <span style={{display: "block"}}>{identity.cover_description}</span>
                        <span style={{display: "block"}}>{identity.description}</span>
                        </td>
                        <td>
                            <span>{identity.price}</span>
                        </td>
                        <td>
                            <span>{identity.total_quantity}</span>
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
              </div>}
        </div>
        </div>
  )
}
