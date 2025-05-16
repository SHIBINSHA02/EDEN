import React from 'react';
import './FluidContainer.css';

const FluidContainer = () => {
  return (
    <div className="fluid-container"> {/* Changed class name */}
      <div className="container-wrapper">
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="fluid-gradient-1" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="purple" stopOpacity="0.7" />
              <stop offset="100%" stopColor="violet" stopOpacity="0.7" />
            </radialGradient>
            <radialGradient id="fluid-gradient-2" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="deeppink" stopOpacity="0.6" />
              <stop offset="100%" stopColor="magenta" stopOpacity="0.6" />
            </radialGradient>
            <filter id="turbulentDisplacement1">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="3" seed="10" stitchTiles="stitch" result="turbulence"/>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G"/>
              <animate attributeName="seed" values="10;20;10" dur="15s" repeatCount="indefinite" />
              <animate attributeName="scale" values="10;15;10" dur="12s" repeatCount="indefinite" />
            </filter>
            <filter id="turbulentDisplacement2">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="3" seed="25" stitchTiles="stitch" result="turbulence"/>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G"/>
              <animate attributeName="seed" values="25;35;25" dur="18s" repeatCount="indefinite" />
              <animate attributeName="scale" values="8;12;8" dur="14s" repeatCount="indefinite" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="70" fill="url(#fluid-gradient-1)" filter="url(#turbulentDisplacement1)">
            <animate attributeName="cx" values="98;102;100" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="101;99;100" dur="17s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="60" fill="url(#fluid-gradient-2)" filter="url(#turbulentDisplacement2)">
            <animate attributeName="cx" values="102;98;100" dur="23s" repeatCount="indefinite" />
            <animate attributeName="cy" values="99;101;100" dur="19s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default FluidContainer;