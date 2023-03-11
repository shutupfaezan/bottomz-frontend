import React, {useState} from 'react';
import Input from '../../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';


export default function PromoterPricing() {
    const [items, setItems] = useState([]);
    const [ticketCategories, setTicketCategories] = useState('')
    const [description, setDescription] = useState('')
    const [coverDescription, setCoverDescription] = useState('')
    const [price, setPrice] = useState(null)
    const [totalQuantity, setTotalQuantity] = useState(null)
    const { eventInfoValue, setEventStepper, eventStepper} = useContext(SingularContext);


    function handleAddItem(event){
        const newItem = { ticketCategories, description, coverDescription, price, totalQuantity };
        setItems([...items, newItem]);

        setTicketCategories('')
        setDescription('')
        setCoverDescription('')
        setPrice(null)
        setTotalQuantity(null)

        event.target.value = null
    }

    function submitPricing(){
        eventInfoValue.push(items)
        setEventStepper(eventStepper + 1)
    }
    
  return (
    <div className='mt-0 mt-md-4 pl-md-2 pr-lg-5 pr-md-2'>
            <div className='col p-0'>
            <label className='ml-2 mb-1'>Ticket Categories:</label>
            <Input name="ticket_category" placeholder="Eg:- Male Stag" id="ticket_category" value={ticketCategories} handleChange={event=>setTicketCategories(event.target.value)}></Input>
            </div>
            <div className='d-md-flex'>
                <div className='col-lg-6 px-0 pr-md-3'>
                <label className='ml-2 mb-1'>Cover Description:</label>
                <Input name="ticket_category" placeholder="Eg:- No Cover" id="ticket_category" value={coverDescription} handleChange={event=>setCoverDescription(event.target.value)}></Input>
                </div>
                <div  className='col-lg-6 px-0 pl-md-3'>
                <label className='ml-3 mb-1'>Description:</label>
                <Input name="description" placeholder="Eg:- Entry Only" id="description" value={description} handleChange={event=>setDescription(event.target.value)}></Input>
                </div>
            </div>
            <div className='d-md-flex'>
                <div className='col-lg-6 px-0 pr-md-3'>
                <label className='ml-3 mb-1'>Price (per ticket):</label>
                <Input name="price" type="number" placeholder="Eg:- Rs. 1000" id="price" value={price} handleChange={event=>setPrice(event.target.value)}></Input>
                </div>
                <div  className='col-lg-6 px-0 pl-md-3'>
                <label className='ml-3 mb-1'>Total Quantity:</label>
                <Input name="total_quantity" type="number" placeholder="Eg:- 100" id="total_quantity" value={totalQuantity} handleChange={event=>setTotalQuantity(event.target.value)}></Input>
                </div>
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
                        <b style={{display: "block"}}>{identity.ticketCategories}</b>
                        <span style={{display: "block"}}>{identity.coverDescription}</span>
                        <span style={{display: "block"}}>{identity.description}</span>
                        </td>
                        <td>
                            <span>{identity.price}</span>
                        </td>
                        <td>
                            <span>{identity.totalQuantity}</span>
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
