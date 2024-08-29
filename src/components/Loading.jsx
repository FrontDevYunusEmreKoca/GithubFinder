import React, { useState } from 'react';
import spinner from '../images/Spinner@1x-1.0s-200px-200px.gif'; // Spinner görselini import ettik

const Loading = () => {
 
  return (
    <div className='loading-container'>
      <img  className='color'  src={spinner} alt="Loading..." />
    </div>
  );
};

export default Loading;


