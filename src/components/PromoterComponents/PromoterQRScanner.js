import React, {useEffect, useState} from 'react';
import PromoterSidebar from '../../common/PromoterSidebar'
import Footer from '../../common/Footer'
import axios from "axios"
import QrScanner from 'react-qr-scanner';

import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import OrderTicketModal from '../../common/OrderTicketModal';


export default function PromoterQRScanner() {
  const [show, setShow] = useState(false)
  const [displayOrders, setDisplayOrders] = useState();
  const [result, setResult] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

useEffect(() => {
  if (result) {
    axios.get(`https://nightlife-2710.herokuapp.com/promoter-modal-values?order_id=${result}`)
      .then(response => {
        setDisplayOrders(response.data)
        console.log(response.data);
        setShow(true)
      })
      .catch(error => {
        // Handle API error
        console.error(error);
      });
  }
}, [result]);

let isDesktop = (width > 768);

  const handleError = err => {
    console.error(err);
  }

  const handleScan = data => {
    if (data) {
      setResult(data.text);
    }
  }

  const handleCancel = () => {
    setResult(null);
  }

  const handleClose = () => setShow(false);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
        <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
      <div className='d-lg-flex px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
        <div className='col-lg-9 p-0 d-flex flex-column align-items-center mt-5 mt-lg-0 justify-content-center align-items-center text-center' style={{height: "100%", width: "100%"}}>
          <BrowserView className='d-flex justify-content-center flex-column vh-100'>
            You need a mobile or a tablet device to use this utility
          </BrowserView>
          <TabletView>
          {result ? (
            <>
              <p>Result: {result}</p>
              <button className="btn btn-secondary" style={{backgroundColor: "black", borderRadius: "10px"}} onClick={handleCancel}>Scan again</button>
            </>
          ) : (
            <QrScanner
              onError={handleError}
              onScan={handleScan}
              style={{ width: '300px', height: '100%' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `environment` }
                    }
                  }
            }
            showViewFinder={true}
            />
          )}
          </TabletView>

          <MobileOnlyView>
          {result ? (
            <>
              <p>Result: {result}</p>
              <button onClick={handleCancel}>Scan again</button>
            </>
          ) : (
            <QrScanner
              onError={handleError}
              onScan={handleScan}
              style={{ width: '300px', height: '100%' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `environment` }
                    }
                  }
            }
            showViewFinder={true}
            />
          )}
          </MobileOnlyView>
        </div>
      </div>
        <Footer/>
              <OrderTicketModal show={show} displayOrders={displayOrders} handleClose={handleClose}/>
      </div>
  )
}

