import React from 'react';
import './header.styles.scss';
import LangSelector from 'components/lang-selector/lang-selector.component';

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/images/logo.svg" alt="Logo" />
      </div>
      <div className="header-links">
        <LangSelector />
      </div>
    </div>
  );
};

export default Header;
