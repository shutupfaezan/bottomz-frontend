// import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { useNavigate, useLocation } from 'react-router-dom';

// const TitleUpdater = () => {
//   const pageTitle = 'Your Default Page Title';

//   useEffect(() => {
//     const handleRouteChange = () => {
//       const url = window.location.href;
//       document.title = `${pageTitle} - ${url}`;
//     };

//     handleRouteChange(); // Update title initially
//     window.addEventListener('hashchange', handleRouteChange);

//     return () => {
//       window.removeEventListener('hashchange', handleRouteChange);
//     };
//   }, [pageTitle]);

//   return null;
// };

// const withTitle = (WrappedComponent) => {
//   return (props) => (
//     <>
//       <Helmet />
//       <TitleUpdater />
//       <WrappedComponent {...props} />
//     </>
//   );
// };

// export default withTitle;
