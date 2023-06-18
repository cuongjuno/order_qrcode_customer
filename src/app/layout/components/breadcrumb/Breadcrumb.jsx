import React from 'react';
import { useMatches } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';

function Breadcrumb() {
  const matches = useMatches();
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    ?.filter((match) => Boolean(match?.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    ?.map((match) => ({
      crumb: match?.handle?.crumb,
      path: match?.pathname,
    }));
  return (
    <div className="fs-16">
      {crumbs?.map((e, index) => (index === crumbs.length - 1 ? (
        <span key={e.path} className="black-050">
          {e.crumb}
        </span>
      ) : (
        <>
          <Link key={e.path} to={e.path} className="fw-500">
            {e.crumb}
          </Link>
          <span className="mx-8">/</span>
        </>
      )))}
    </div>
  );
}

export default Breadcrumb;
