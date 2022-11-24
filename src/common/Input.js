import React from 'react'


export default function Input(props) {

  return (
   <>
  <div>
    <div className='mt-2'>
      <input className="form-control" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} style={{borderRadius: "40px"}}></input>
    </div>
  </div>
   </>
  )
}