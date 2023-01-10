import React from 'react'


export default function Input(props) {

  return (
   <>
  <div>
    <div className='mt-2 d-flex justify-content-center align-items-center'>
      <i className={props.icon} style={{fontSize: "22px", color: "gray", marginRight: "5px"}}></i>
      <input className="form-control" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} type={props.type} style={{borderRadius: "20px", width: "85%"}}></input>
    </div>
  </div>
   </>
  )
}