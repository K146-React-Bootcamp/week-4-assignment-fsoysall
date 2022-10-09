import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

// context yapısı buraya taşınıp, en üst seviyeden işlem denenecek
// ( context.provider )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
