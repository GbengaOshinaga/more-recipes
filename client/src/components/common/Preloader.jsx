import React from 'react';

/**
 * Preloader component
 *
 * @returns {Node} preloader
 */
export default function Preloader() {
  const loader = color => (
    <div className={`spinner-layer ${color}`}>
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  );

  return (
    <div
      style={{ marginLeft: '50%' }}
      className="preloader-wrapper active center-align"
    >
      {loader('spinner-blue')}
      {loader('spinner-red')}
      {loader('spinner-yellow')}
      {loader('spinner-green')}
    </div>
  );
}
