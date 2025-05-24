import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json'; // Ensure this path is correct
import './Loading.css';

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="loadingContainer">
      <Lottie options={defaultOptions} />
    </div>
  );
};