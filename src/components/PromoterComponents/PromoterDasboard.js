import React from 'react'
import PromoterSidebar from "../../common/PromoterSidebar"
import PromoterHost from './PromoterHost'

export default function PromoterDasboard() {
  return (
      <>
      <div className='d-md-flex'>
        <div className='col-md-3 p-0  '>
          <PromoterSidebar/>
        </div>
        <div className='col-md-9 p-0'>
          <PromoterHost/>
        </div>
      </div>
      </>
  )
}
