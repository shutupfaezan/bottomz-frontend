import React, {useState} from 'react';
import Input from '../../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../../contexts/Context';


export default function PromoterPricing() {
    const [items, setItems] = useState([]);
    const [ticketCategories, setTicketCategories] = useState('')
    const [description, setDescription] = useState('')
    const [coverDescription, setCoverDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const { eventInfoValue, setEventStepper, eventStepper} = useContext(SingularContext);


    function handleAddItem(event){
        const newItem = { ticketCategories, description, coverDescription, price, totalQuantity };
        setItems([...items, newItem]);

        setTicketCategories('')
        setDescription('')
        setCoverDescription('')
        setPrice(0)
        setTotalQuantity(0)

        event.target.value = null
    }

    function submitPricing(){
        eventInfoValue.push(items)
        setEventStepper(eventStepper + 1)
    }
    
  return (
    <div className='mt-4 ml-2'>
            <div>
            <label className='ml-3 mb-1'>Ticket Categories:</label>
            <Input name="ticket_category" placeholder="Eg:- Male Stag" id="ticket_category" value={ticketCategories} handleChange={event=>setTicketCategories(event.target.value)}></Input>
            </div>
            <div className='d-flex'>
                <div className='w-50'>
                <label className='ml-3 mb-1'>Cover Description:</label>
                <Input name="ticket_category" placeholder="Eg:- No Cover" id="ticket_category" value={coverDescription} handleChange={event=>setCoverDescription(event.target.value)}></Input>
                </div>
                <div  className='w-50'>
                <label className='ml-3 mb-1'>Description:</label>
                <Input name="description" placeholder="Eg:- Entry Only" id="description" value={description} handleChange={event=>setDescription(event.target.value)}></Input>
                </div>
            </div>
            <div className='d-flex'>
                <div className='w-50'>
                <label className='ml-3 mb-1'>Price (per ticket):</label>
                <Input name="price" placeholder="Eg:- Rs. 1000" id="price" value={price} handleChange={event=>setPrice(event.target.value)}></Input>
                </div>
                <div  className='w-50'>
                <label className='ml-3 mb-1'>Total Quantity:</label>
                <Input name="total_quantity" placeholder="Eg:- 100" id="total_quantity" value={totalQuantity} handleChange={event=>setTotalQuantity(event.target.value)}></Input>
                </div>
            </div>
        <div className='d-flex'>
        <button type="submit"  onClick={handleAddItem} className="m-2 btn btn-primary w-50">Add Pricing Category</button>
        <button type="submit" onClick={submitPricing} className="m-2 btn btn-primary w-50">Review and Submit</button>
        </div>
        <div>
        <h5 className='my-3 ml-3'>Your added categories apper here:</h5> 
        {items?.[0] && <div>
            <table className="table table-hover">
                <tbody>
                  {items?.map((identity, fields)=>{
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
              </div>}
        </div>
        </div>
  )
}
