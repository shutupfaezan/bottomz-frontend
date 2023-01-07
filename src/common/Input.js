import React from 'react'


export default function Input(props) {

  return (
   <>
  <div>
    <div className='mt-2 d-flex justify-content-center'>
      <input className="input" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} type={props.type} style={{borderRadius: "20px", width: "85%"}}></input>
    </div>
  </div>
   </>
  )
}