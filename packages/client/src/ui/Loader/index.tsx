import React from 'react';
import './index.scss';

const Loader = () => {
  return (
    <div
      className='loader-wrapper'
      onClick={(event) => {
        event.preventDefault();
      }}>
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
