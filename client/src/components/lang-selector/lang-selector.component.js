import React from 'react';
import './lang-selector.styles.scss';
import { locales, dynamicActivate } from '../../i18n';

const LangSelector = () => {
  return (
    <div className="lang-container">
      {Object.values(locales).map((locale, index) => (
        <div class="lang" key={locale}>
          <img
            src={`/images/locales/${Object.keys(locales)[index]}.svg`}
            alt={Object.keys(locales)[index]}
            onClick={() => dynamicActivate(Object.keys(locales)[index])}
          />
        </div>
      ))}
    </div>
  );
};

export default LangSelector;
