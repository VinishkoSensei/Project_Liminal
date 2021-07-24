import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { defaultLocale, dynamicActivate } from './i18n';
import HomePage from './pages/homepage/homepage.component';

const I18nApp = () => {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <HomePage />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </I18nProvider>
  );
};

ReactDOM.render(<I18nApp />, document.getElementById('root'));

reportWebVitals();
