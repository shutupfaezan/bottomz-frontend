import React, {useEffect, useState} from 'react';
import PromoterSidebar from '../../common/PromoterSidebar'
import Footer from '../../common/Footer'
import QrScanner from 'react-qr-scanner';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';


export default function PromoterQRScanner() {
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

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
        <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
      <div className='d-lg-flex px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
        <div className='col-lg-9 p-0 d-flex flex-column align-items-center mt-5 mt-lg-0 justify-content-center align-items-center text-center' style={{height: "100%"}}>
          <BrowserView>

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
              style={{ width: '300px', height: '300px' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `environment` }
                    }
                  }
            }
            showViewFinder={false}
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
              style={{ width: '100%', height: '100%' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `environment` }
                    }
                  }
            }
            showViewFinder={false}
            />
          )}
          </MobileOnlyView>
        </div>
      </div>
        <Footer/>
      </div>
  )
}

