import React from 'react';
import { motion } from 'framer-motion';

const FluffyCloud = () => {
  return (
    <motion.div
      initial={{ x: '-100%', y: '20%' }} // Start off-screen
      animate={{ x: '1400%', y: '-50%' }} // Move across the screen
      transition={{ duration: 50, ease: 'linear', repeat: Infinity }} // Animation settings
      style={{
        position: 'absolute',
        top: '20%', // Adjust vertical position
        left: '0%',
        width: '100px',
        height: '60px',
        background: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 20px rgba(153, 145, 145, 0.5)', // Soft shadow for fluffiness
      }}
    />
  );
};

export default FluffyCloud;


// Usage in a component
// import FluffyCloud from './FluffyCloud';