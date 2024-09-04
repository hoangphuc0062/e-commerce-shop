// Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routeTranslations } from './routeTranslationsConfig';

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Translation map from English to Vietnamese


// Function to translate the route segment
const translatePath = (pathSegment) => {
  return routeTranslations[pathSegment] ? routeTranslations[pathSegment] : capitalizeFirstLetter(pathSegment);
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav>
      <ul className='flex'>
        <li>
          <Link to="/">Trang chủ /</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to}>
              <Link className={index === pathnames.length - 1 ? 'text-black font-bold' : 'text-black-50'} to={to}>
                {translatePath(value)}
              </Link>
              {index < pathnames.length - 1 && ' / '}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
