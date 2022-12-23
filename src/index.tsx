import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <App />
    <Footer />
  </BrowserRouter>,
);

reportWebVitals();
