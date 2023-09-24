import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" style={{'--bs-breadcrumb-divider': '>'}}>
      <ol className="breadcrumb mx-md-5 mx-1" style={{ background: 'none', color: 'white' }}>
        <li className="breadcrumb-item">
          <Link to="/" style={{ background: 'none', color: 'white', fontWeight: '400' }}>
            HOME
          </Link>
        </li>
        {pathnames?.map((name, index) => {
          // Decode URL-encoded characters and replace them with spaces
          const cleanName = decodeURIComponent(name).replace(/-/g, ' ');
          const routeTo = `/${pathnames.slice(0, index + 1).join('')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              key={cleanName}
              style={{ background: 'none', color: 'white', textTransform: "uppercase", fontSize: "16px" }}>
              {isLast ? cleanName : <Link className='text-white' to={routeTo}>{cleanName}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

