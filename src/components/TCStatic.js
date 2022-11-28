import React from 'react'

export default function TCStatic() {
  return (
    <div className='mt-2 w-100 mx-3 d-none d-md-block' >
        <h3 className='d-flex justify-content-center mt-4'>Terms & Condition</h3>
        <ul className='p-3' style={{color: "rgba(0,0,0,.85)"}}>
        <li className='m-1'><small>DJ/Promoters guestlist on discounted rate for entry. Guestlist shuts at 10.30pm</small></li>
        <li className='m-1'><small>Without pre booking, walk in tickets will be on different rates as per time slots charged at the venue.</small></li>
        <li className='m-1'><small>All tickets are single entry only with no cover charge.</small></li>
        <li className='m-1'><small>21+ Government Issued Identification is needed for entry (physical ID of driver's license or Aadhar Card).</small></li>
        <li className='m-1'><small>Management reserves the right to refuse entry in accordance with licensing law.</small></li>
        <li className='m-1'><small>Consumption of illegal substances is strictly prohibited.</small></li>
        <li className='m-1'><small>Internet handling fee per ticket maybe levied. Please check the total amount.</small></li>
        <li className='m-1'><small>Entry must be no later than the time on your ticket.</small></li>
        </ul>
    </div>
  )
}
