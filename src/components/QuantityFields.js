import React from 'react'
import { SingularContext } from '../contexts/Context';
import {useContext} from 'react'
import { BrowserView, MobileOnlyView } from 'react-device-detect';

export default function QuantityFields(props) {
  const { inputValues, setInputValues } = useContext(SingularContext);


  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = {
      ...newInputValues[index],
      "ticket_categories": props.identity.ticket_categories,
      "cover_description": props.identity.cover_description,
      "description": props.identity.description,
      "quantity": event.target.value,
      "total_price": event.target.value * props.identity.price
    };
    setInputValues(newInputValues);
  };


  return (
    <tr>
        <th style={{fontWeight: "100", alignItems: "center", width: "33%"}} scope="row">
            <div>{props.identity.ticket_categories}</div>
            <div>{props.identity.description}</div>
            <div style={{color: "gray"}}>{props.identity.cover_description}</div>
        </th>
        {/* eslint-disable-next-line */}
        <td style={{fontWeight: "100", verticalAlign: "middle"}}>{props.identity.price != 0 && "₹"}{props.identity.price != 0 ? props.identity.price : "Free"}</td>
        <td style={{fontWeight: "100", verticalAlign: "middle", textAlign: "center"}}>
            <div className="input-group mb-3 float-right" style={{width: "55%"}}>
              <BrowserView className='w-50'>
                <label className="input-group-text " htmlFor="inputGroupSelect01">Qty</label>
              </BrowserView>
              <MobileOnlyView className='w-100'>
                <label className="input-group-text" htmlFor="inputGroupSelect01">Qty</label>
              </MobileOnlyView>
            <select className="form-select" id={"TicketDropdown" + props.index} name={"TicketDropdown" + props.index} value={inputValues[props.index] ? inputValues[props.index]["TicketDropdown" + props.index] : ''} onChange={(event) => handleInputChange(event, props.index)}>
                <option defaultValue>0</option>
                <option value="1">1</option>  
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>
        </td>
    </tr>
  )
}
