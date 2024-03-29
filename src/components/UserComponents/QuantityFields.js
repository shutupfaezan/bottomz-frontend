import React from 'react'
import { SingularContext } from '../../contexts/Context';
import {useContext} from 'react'

export default function QuantityFields(props) {
  const { inputValues, setInputValues } = useContext(SingularContext);

  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    const newQuantity = event.target.value;
    if (newQuantity > 0) {
      newInputValues[index] = {
        ...newInputValues[index],
        "ticket_categories": props.identity.ticket_category,
        "cover_description": props.identity.cover_description,
        "description": props.identity.description,
        "quantity": newQuantity,
        "total_price": newQuantity * props.identity.price
      };
    } else {
      newInputValues[index]["quantity"] = 0;
      newInputValues[index]["total_price"] = 0;
    }
    
    
    setInputValues(newInputValues);
  };

  return (
    <tr>
      <td className="col-8 col-md-5" style={{ fontWeight: "100", alignItems: "center" }}>
        <div>{props.identity.ticket_category}</div>
        <div>{props.identity.description}</div>
        <div style={{ color: "gray" }}>{props.identity.cover_description}</div>
      </td>
      {/* eslint-disable-next-line */}
      <td className="col-4 col-md-2 text-md-start text-end" style={{ fontWeight: "100", verticalAlign: "middle" }}>{props.identity.price != 0 && "₹"}{props.identity.price != 0 ? props.identity.price : "Free"}</td>
      <td className="col col-md-5 p-md-3 py-3" style={{ fontWeight: "100", verticalAlign: "middle", textAlign: "center", width: "100%" }}>
        <div className="input-group ml-md-0 p-0 pr-0 float-md-right col-12 col-md-7 col-lg-4 w-100" style={{ border: "1px solid black", overflow: "hidden", borderRadius: "10px" }}>
          <div className= {props?.identity?.status === "Sold Out" ? "col p-0 text-center":  'col-3 px-0 col-md-6'}>
            <label className={props?.identity?.status === "Sold Out" ? "input-group-text d-flex justify-content-center":  "input-group-text "}  htmlFor={"TicketDropdown" + props.index}>
            {props?.identity?.status === "Sold Out" ? "Sold Out":  "Qty"}
              </label>
          </div>
          
          <select
            className= {props?.identity?.status === "Sold Out" ? "form-select text-end QuantityFields d-none" : "form-select text-end QuantityFields"}
            id={"TicketDropdown" + props.index}
            name={"TicketDropdown" + props.index}
            value={inputValues[props.index] ? inputValues[props.index]["TicketDropdown" + props.index] : ''}
            onChange={(event) => handleInputChange(event, props.index)}
          >
                <option value="0">0</option>
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
