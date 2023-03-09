import React from 'react';
import "../css/HostBarExtra.css"
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import PromoterEventInfo from '../components/PromoterComponents/PromoterEventInfo';
import PromoterPricing from '../components/PromoterComponents/PromoterPricing';
import PromoterReviewInfo from '../components/PromoterComponents/PromoterReviewInfo';
import PromoterSidebar from '../common/PromoterSidebar';


export default function AutoHost() {
  const { eventStepper } = useContext(SingularContext);
  return(
    <>
  <div className='d-lg-flex vh-100 px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
    <div className='px-0 col-md-9 mt-0 mt-md-4 '>
        {eventStepper === 1 && <PromoterEventInfo/>}
        {eventStepper === 2 && <PromoterPricing/>}
        {eventStepper === 3 && <PromoterReviewInfo/>}
    </div>
    </div>
    </>
  )
}
