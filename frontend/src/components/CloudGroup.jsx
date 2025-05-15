// CloudGroup.js
import React from 'react';
import FluffyCloud from './FluffyCloud';

const CloudGroup = () => {
  return (
    <div style={{ position: 'relative', width: '250px', height: '120px' }}> {/* Adjust width and height */}
      <FluffyCloud style={{ top: '60%', left: '10%', width: '80px', height: '50px' }} /> {/* Bottom left */}
      <FluffyCloud style={{ top: '60%', left: '50%', width: '100px', height: '60px' }} /> {/* Bottom right */}
      <FluffyCloud style={{ top: '20%', left: '30%', width: '120px', height: '70px' }} /> {/* Top center */}
    </div>
  );
};

export default CloudGroup;
