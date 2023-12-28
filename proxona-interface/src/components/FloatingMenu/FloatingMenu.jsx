import React, { useState } from 'react';
import './FloatingMenu.css'; 

export const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-menu-container">
      <button onClick={toggleMenu} className="floating-menu-toggle">
        +
      </button>

      {isOpen && (
        <div className="floating-menu-content">
          <ul>
            <li>Eun Jeong</li>
            <li>Juho</li>
            <li>Min</li>
            <li>Yoonseo</li>
            <li>Seulgi</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// export default FloatingMenu;
