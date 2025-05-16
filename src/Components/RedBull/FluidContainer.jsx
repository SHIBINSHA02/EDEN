import React from 'react';
import './FluidContainer.css';

const FluidContainer = () => {
  return (
    <div className="scene">
      <div className="container-wrapper">
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="fluid-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="yellow" stopOpacity="1" />
              <stop offset="100%" stopColor="red" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="highlight-gradient" cx="40%" cy="40%" r="20%" fx="40%" fy="40%">
              <stop offset="0%" stopColor="white" stopOpacity="0.7" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <filter id="displacementFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="4" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <g filter="url(#displacementFilter)">
            <circle cx="100" cy="100" r="95" fill="url(#fluid-gradient)">
              <animate attributeName="r" values="92;98;95;91;96" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cx" values="97;103;99;101;98" dur="5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="101;98;102;99;100" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </g>
          <ellipse cx="90" cy="90" rx="25" ry="18" fill="url(#highlight-gradient)">
            <animate attributeName="cx" values="85;115;95;105;88" dur="7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="88;110;92;108;90" dur="6.5s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
    </div>
  );
};

export default FluidContainer;