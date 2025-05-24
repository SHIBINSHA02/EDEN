import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json'; // Corrected path to loading.json

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};
