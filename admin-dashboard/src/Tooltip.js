// Tooltip.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tooltip = ({ children, content,onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute top-28 z-10 w-64 p-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
          role="tooltip"
        >
          <div className="flex justify-around">
            {content.map((emoji, index) => (
              <motion.span
              onClick={() => onClick(emoji)}
                key={index}
                className="text-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <div className="absolute w-2.5 h-2.5 -translate-x-1/2 bg-white border border-gray-200 rounded rotate-45 dark:bg-gray-800 dark:border-gray-600" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

