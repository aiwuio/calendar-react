import React, { useState } from 'react';
import './humburgerbutton.css'; // Подключите файл стилей

const HamburgerButton = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className="menu-panel">
        {/* Ваше содержимое панели */}
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">О нас</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerButton;
