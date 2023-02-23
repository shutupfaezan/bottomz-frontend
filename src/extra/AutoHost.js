import React from 'react';
import "../css/HostBarExtra.css"
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import PromoterEventInfo from '../components/PromoterComponents/PromoterEventInfo';
import PromoterPricing from '../components/PromoterComponents/PromoterPricing';
import PromoterReviewInfo from '../components/PromoterComponents/PromoterReviewInfo';


export default function AutoHost() {
  const { eventStepper } = useContext(SingularContext);
  return (
    <div className='imPEHI leHLON'> 
        <div elevation="2" className='jksHKM uAaqh'>
            <div className='dLUKiG pr-1 pt-md-3 pt-2 pl-4'>
                <span color='yellow-8' size="18" letterSpacing="normal" className='fcxZkm'>Event Info</span>
            </div>
            <div className='dLUKiG pr-1 pt-md-3 pl-4'>
                <span className='fcxZkm'>Price</span>
            </div>
            <div className='dLUKiG pr-2 pt-md-3 pl-4'>
                <span className='fcxZkm'>Review</span>
            </div>
        </div>
        {eventStepper === 1 && <PromoterEventInfo/>}
        {eventStepper === 2 && <PromoterPricing/>}
        {eventStepper === 3 && <PromoterReviewInfo/>}
    </div>
  )
}
